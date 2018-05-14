const { Controller } = require('egg');
class BaseController extends Controller {
  success(data, status) {
    this.ctx.body = {
      success: true,
      data,
    };
    const statusCode = status || 200
    this.ctx.status = statusCode
  }
  faild(msg, status) {
    this.ctx.body = {
      success: false,
      message: msg,
    };
    const statusCode = status || 400
    this.ctx.status = statusCode
  }
  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;