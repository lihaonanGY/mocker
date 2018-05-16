const Model = require('../../models');
const _ = require('lodash')
const BaseController = require('../base_controller');
const mongoose = require('mongoose')
module.exports = app => {

  return class ProjectController extends BaseController {
    async addProjectWeb() {
      const { ctx } = this;
      await ctx.renderClient('addProject/addProject.js');
    }
    async updateProjectWeb() {
      const { ctx } = this;
      await ctx.renderClient('updateProject/updateProject.js');
    }
    async addProject() {
      const { ctx } = this
      try {
        ctx.validate({
          name: { type: 'string' },
          description: { type: 'string' },
          create_user: { type: 'string' },
          is_public: { type: 'boolean' }
        });
      } catch (err) {
        ctx.logger.warn(err.errors);
        this.faild(`${err.errors[0].field}:${err.errors[0].message}`)
        return;
      }
      const reqProject = ctx.request.body
      const project = await Model.Project.findOne({ name: ctx.request.body.name })
      if (!_.isEmpty(project)) {
        this.faild('创建失败，该项目已存在')
        return
      }
      const user = await Model.User.findOne({ _id: ctx.request.body.create_user })
      reqProject.create_user = user
      if (!ctx.request.body.is_public) {
        const members = []
        for (let i = 0; i < ctx.request.body.members.length; i++) {
          const user = await Model.User.findOne({ username: ctx.request.body.members[i] })
          if (_.isEmpty(user)) {
            this.faild('创建失败，找不到该用户' + ctx.request.body.members[i])
            return
          }
          if (_.toString(user._id) !== ctx.request.body.create_user) {
            members.push(user)
          }
        }
        reqProject.members = members
      } else {
        reqProject.members = []
      }
      const res = await Model.Project.create(reqProject)
      this.success(res, 201)
    }
    async updateProject() {
      const { ctx } = this
      try {
        ctx.validate({
          name: { type: 'string' },
          description: { type: 'string' },
          is_public: { type: 'boolean' },
          members: {
            type: 'array',
            itemType: 'string',
            required: false
          }
        });
      } catch (err) {
        ctx.logger.warn(err.errors);
        this.faild(`${err.errors[0].field}:${err.errors[0].message}`)
        return;
      }
      const reqProject = ctx.request.body
      const id = ctx.params.id
      if (!ctx.request.body.is_public) {
        const members = []
        for (let i = 0; i < ctx.request.body.members.length; i++) {
          const user = await Model.User.findOne({ username: ctx.request.body.members[i] })
          if (_.isEmpty(user)) {
            this.faild('创建失败，找不到该用户' + ctx.request.body.members[i])
            return
          }
          if (_.toString(user._id) !== ctx.request.body.create_user) {
            members.push(user)
          }
        }
        reqProject.members = members
      } else {
        reqProject.members = []
      }
      const res = await Model.Project.findByIdAndUpdate(id, reqProject)
      if (_.isEmpty(res)) {
        this.faild('更新失败，未找到该项目')
      }
      this.success(res, 201)
    }
    async deleteProject() {
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
      const project = await Model.Project.findOne({ id })
      if (_.isEmpty(project)) {
        this.faild('删除失败，未找到该项目')
      } else if (project.create_user !== id) {
        this.faild('删除失败，非项目拥有者无法删除项目')
      }
      await Model.Project.deleteOne({ _id: id })
      this.success('删除成功', 201)
    }
    async getProjects() {
      const { ctx } = this
      // const pageSize = 20
      // const pageIndex = 1
      // 1: 全部
      // 2: 我创建的
      // 3: 公有项目
      // 4: 私有项目
      const type = Number(ctx.query.type)
      const userId = mongoose.Types.ObjectId(ctx.query.userId)
      if (type === 1) {
        const project = await Model.Project.find().sort({ _id: -1 })
        this.success(project, 200)
      } else if (type === 2) {
        const project = await Model.Project.find({ 'create_user._id': userId }).sort({ _id: -1 })
        this.success(project, 200)
      } else if (type === 3) {
        const project = await Model.Project.find({ is_public: true }).sort({ _id: -1 })
        this.success(project, 200)
      } else if (type === 4) {
        const project = await Model.Project.find({ is_public: false }).sort({ _id: -1 })
        this.success(project, 200)
      } else if (ctx.query.projectId) {
        const project = await Model.Project.findById(ctx.query.projectId)
        this.success(project, 200)
      }
    }
  };
};