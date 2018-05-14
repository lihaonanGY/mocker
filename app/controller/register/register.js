const Model = require('../../models');
const _ = require('lodash')
module.exports = app => {

  return class RegisterController extends app.Controller {
    async index() {
      const { ctx } = this;
      await ctx.render('register/register.js');
    }
    async register() {
      const { ctx } = this
      const user = await userProxy.getByName(name)
      if (!_.isEmpty(user)) {
        this.body = this.util.refail('注册失败，该用户已存在')
        return
      }
      const res = await Model.User.create({
        username: ctx.request.body.username,
        password: ctx.request.body.password
      })
      ctx.body = res
      ctx.status = 201
    }
  };
};