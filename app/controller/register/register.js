const Model = require('../../models');
const _ = require('lodash')
const BaseController = require('../base_controller');
const bcrypt = require('bcryptjs');
const tp = require('../../util/toPromise')
module.exports = app => {

  return class RegisterController extends BaseController {
    async index() {
      const { ctx } = this;
      await ctx.render('register/register.js');
    }
    async register() {
      const { ctx } = this
      try {
        ctx.validate({
          username: { type: 'string' },
          nick_name: { type: 'string' },
          password: {
            type: 'string',
            min: 6,
            max: 40
          }
        });
      } catch (err) {
        ctx.logger.warn(err.errors);
        this.faild(`${err.errors[0].field}:${err.errors[0].message}`)
        return;
      }

      const user = await Model.User.findOne({ username: ctx.request.body.username })
      if (!_.isEmpty(user)) {
        this.faild('注册失败，该用户已存在')
        return
      }
      // 将密码散列加盐存储
      const bcryptPassword = await tp(bcrypt.hash, ctx.request.body.password, 8)
      const res = await Model.User.create({
        username: ctx.request.body.username,
        nick_name: ctx.request.body.nick_name,
        password: bcryptPassword
      })
      this.success(res, 201)
    }
  };
};