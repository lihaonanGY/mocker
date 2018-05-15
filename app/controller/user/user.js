const Model = require('../../models');
const _ = require('lodash')
const BaseController = require('../base_controller');
const bcrypt = require('bcryptjs');
const tp = require('../../util/toPromise')
module.exports = app => {

  return class RegisterController extends BaseController {
    async registerWeb() {
      const { ctx } = this;
      await ctx.renderClient('register/register.js');
    }
    async loginWeb() {
      const { ctx } = this;
      await ctx.renderClient('login/login.js');
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
    async login() {
      const { ctx } = this

      const user = await Model.User.findOne({ username: ctx.request.body.username })
      if (_.isEmpty(user)) {
        this.faild('登录失败，该用户不存在')
        return
      }
      // 对比字符串与经过加密的字符串是否相同
      const verifyPassword = await tp(bcrypt.compare, ctx.request.body.password, user.password)
      if (!verifyPassword) {
        this.faild('请检查密码是否正确')
        return
      }
      const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret);
      this.success({
        token,
        nick_name: user.nick_name,
        id: user._id,
        message: '登录成功'
      }, 201)
    }
  };
};