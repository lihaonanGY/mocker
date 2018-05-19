const Model = require('../../models');
const _ = require('lodash')
const BaseController = require('../base_controller');
const mongoose = require('mongoose')
const Mockjs = require('mockjs')
module.exports = app => {

  return class ApiController extends BaseController {
    async apiListWeb() {
      const { ctx } = this;
      await ctx.renderClient('apiList/apiList.js');
    }
    async createUpdateWeb() {
      const { ctx } = this
      await ctx.renderClient('createUpdateApi/createUpdateApi.js')
    }

    async addApi() {
      const { ctx } = this
      try {
        ctx.validate({
          project: { type: 'string' },
          description: { type: 'string' },
          url: { type: 'string' },
          method: { type: 'string' },
          response_mock: { type: 'object' },
          response_api_tree: { type: 'array' }
        });
      } catch (err) {
        ctx.logger.warn(err.errors);
        this.faild(`${err.errors[0].field}:${err.errors[0].message}`)
        return;
      }
      const reqBody = ctx.request.body
      const api = await Model.Api.findOne({ url: reqBody.url, project: reqBody.project })
      if (!_.isEmpty(api)) {
        this.faild('创建失败，该url下已存在接口')
        return
      }
      await this.findReg(reqBody.response_mock)
      const res = await Model.Api.create(reqBody)
      this.success(res, 201)
    }
    // 需要改成能够兼容所有的正则类型 赶时间先这样了
    async findReg(obj) {
      if (_.isObject(obj)) {
        Object.keys(obj).forEach(item => {
          if (_.isArray(obj[item])) {
            if (!_.isObjectLike(obj[item][0])) {
              if (obj[item][0] === '/^1[0-9]{10}$/') {
                obj[item][0] = eval(obj[item][0])
              }
            } else {
              this.findReg(obj[item][0])
            }
          } else if (_.isObject(obj[item])) {
            this.findReg(obj[item])
          } else {
            if (obj[item] === '/^1[0-9]{10}$/') {
              obj[item] = eval(obj[item])
            }
          }
        })
      } else if (_.isArray(obj)) {
        obj.forEach(item => {
          if (_.isArray(item)) {
            if (!_.isObjectLike(item[0])) {
              if (item[0] === '/^1[0-9]{10}$/') {
                item[0] = eval(item[0])
              }
            } else {
              this.findReg(item[0])
            }
          } else if (_.isObject(item)) {
            this.findReg(item)
          } else {
            if (item === '/^1[0-9]{10}$/') {
              item = eval(item)
            }
          }
        })
      } else {
        if (obj === '/^1[0-9]{10}$/') {
          obj = eval(obj)
        }
      }
    }

    async mock() {
      const { ctx } = this
      if (ctx.params[0].indexOf('/') === -1) {
        this.faild('api路径有误')
      }
      const pid = ctx.params[0].substr(0, ctx.params[0].indexOf('/'))
      const url = ctx.params[0].substr(ctx.params[0].indexOf('/') + 1)
      const project = await Model.Project.findById(pid)
      if (_.isEmpty(project)) {
        this.faild('api路径有误,找不到该项目')
        return
      }
      const api = await Model.Api.findOne({ url, project: pid })
      if (_.isEmpty(api)) {
        this.faild('找不到该api')
        return
      }
      const resData = Mockjs.mock(api.response_mock)
      this.ctx.body = resData
      this.ctx.status = 200
    }
    async getApi() {
      const { ctx } = this
      // const pageSize = 20
      // const pageIndex = 1
      const method = ctx.query.method
      let pid = ctx.query.projectId
      let apiId = ctx.query.apiId
      if (pid) {
        pid = mongoose.Types.ObjectId(pid)
      }
      if (apiId) {
        apiId = mongoose.Types.ObjectId(apiId)
      }
      const url = ctx.query.url
      if (method && pid) {
        const apis = await Model.Api.find({ project: pid, method }).sort({ _id: -1 })
        this.success(apis, 200)
      } else if (url && pid) {
        const api = await Model.Api.findOne({ url, project: pid }).sort({ _id: -1 })
        if (_.isEmpty(api)) {
          this.faild('找不到该api')
          return
        }
        this.success(api, 200)
      } else if (apiId) {
        const api = await Model.Api.findById(apiId).sort({ _id: -1 })
        if (_.isEmpty(api)) {
          this.faild('找不到该api')
          return
        }
        this.success(api, 200)
      } else if (pid) {
        const apis = await Model.Api.find({ project: pid }).sort({ _id: -1 })
        this.success(apis, 200)
      }
    }
    async updateApi() {
      const { ctx } = this
      try {
        ctx.validate({
          project: { type: 'string' },
          description: { type: 'string' },
          url: { type: 'string' },
          method: { type: 'string' },
          response_mock: { type: 'object' },
          response_api_tree: { type: 'array' }
        });
      } catch (err) {
        ctx.logger.warn(err.errors);
        this.faild(`${err.errors[0].field}:${err.errors[0].message}`)
        return;
      }
      const apiId = ctx.params.id
      const apiReq = ctx.request.body
      const res = await Model.Api.findByIdAndUpdate(apiId, apiReq)
      if (_.isEmpty(res)) {
        this.faild('更新失败，未找到该项目')
      }
      this.success(res, 201)
    }
    async deleteApi() {
      const { ctx } = this
      try {
        ctx.validate({
          id: { type: 'string' }
        });
      } catch (err) {
        ctx.logger.warn(err.errors);
        this.faild(`${err.errors[0].field}:${err.errors[0].message}`)
        return;
      }
      const id = ctx.request.body.id
      const api = await Model.Api.findOne({ id })
      if (_.isEmpty(api)) {
        this.faild('删除失败，未找到该接口')
      }
      await Model.Api.deleteOne({ _id: id })
      this.success('删除成功', 201)
    }
  };
};