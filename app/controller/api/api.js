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
      this.success(resData, 200)
    }
    // async updateProject() {
    //   const { ctx } = this
    //   try {
    //     ctx.validate({
    //       name: { type: 'string' },
    //       description: { type: 'string' },
    //       is_public: { type: 'boolean' },
    //       members: {
    //         type: 'array',
    //         itemType: 'string',
    //         required: false
    //       }
    //     });
    //   } catch (err) {
    //     ctx.logger.warn(err.errors);
    //     this.faild(`${err.errors[0].field}:${err.errors[0].message}`)
    //     return;
    //   }
    //   const reqProject = ctx.request.body
    //   const id = ctx.params.id
    //   if (!ctx.request.body.is_public) {
    //     const members = []
    //     for (let i = 0; i < ctx.request.body.members.length; i++) {
    //       const user = await Model.User.findOne({ username: ctx.request.body.members[i] })
    //       if (_.isEmpty(user)) {
    //         this.faild('创建失败，找不到该用户' + ctx.request.body.members[i])
    //         return
    //       }
    //       if (_.toString(user._id) !== ctx.request.body.create_user) {
    //         members.push(user)
    //       }
    //     }
    //     reqProject.members = members
    //   } else {
    //     reqProject.members = []
    //   }
    //   const res = await Model.Project.findByIdAndUpdate(id, reqProject)
    //   if (_.isEmpty(res)) {
    //     this.faild('更新失败，未找到该项目')
    //   }
    //   this.success(res, 201)
    // }
    // async deleteProject() {
    //   const { ctx } = this
    //   try {
    //     ctx.validate({
    //       id: { type: 'string' }
    //     });
    //   } catch (err) {
    //     ctx.logger.warn(err.errors);
    //     this.faild(`${err.errors[0].field}:${err.errors[0].message}`)
    //     return;
    //   }
    //   const id = ctx.request.body.id
    //   const project = await Model.Project.findOne({ id })
    //   if (_.isEmpty(project)) {
    //     this.faild('删除失败，未找到该项目')
    //   } else if (project.create_user !== id) {
    //     this.faild('删除失败，非项目拥有者无法删除项目')
    //   }
    //   await Model.Project.deleteOne({ _id: id })
    //   this.success('删除成功', 201)
    // }
    // async getProjects() {
    //   const { ctx } = this
    //   // const pageSize = 20
    //   // const pageIndex = 1
    //   // 1: 全部
    //   // 2: 我创建的
    //   // 3: 公有项目
    //   // 4: 私有项目
    //   const type = Number(ctx.query.type)
    //   const userId = mongoose.Types.ObjectId(ctx.query.userId)
    //   if (type === 1) {
    //     const project = await Model.Project.find().sort({ _id: -1 })
    //     this.success(project, 200)
    //   } else if (type === 2) {
    //     const project = await Model.Project.find({ 'create_user._id': userId }).sort({ _id: -1 })
    //     this.success(project, 200)
    //   } else if (type === 3) {
    //     const project = await Model.Project.find({ is_public: true }).sort({ _id: -1 })
    //     this.success(project, 200)
    //   } else if (type === 4) {
    //     const project = await Model.Project.find({ is_public: false }).sort({ _id: -1 })
    //     this.success(project, 200)
    //   } else if (ctx.query.projectId) {
    //     const project = await Model.Project.findById(ctx.query.projectId)
    //     this.success(project, 200)
    //   }
    // }
  };
};