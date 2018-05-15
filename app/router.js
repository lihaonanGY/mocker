
module.exports = app => {
  app.get('/', app.controller.home.home.index);
  app.get('/register', app.controller.user.user.registerWeb);
  app.get('/login', app.controller.user.user.loginWeb);

  app.get('/app/api/article/list', app.controller.app.app.list);
  app.get('/app/api/article/:id', app.controller.app.app.detail);
  app.get('/app(/.+)?', app.controller.app.app.index);
  app.get('/css/module', app.controller.css.css.module);
  app.get('/sass', app.controller.css.css.sass);

  // api
  // app.post('/api/register', app.jwt, app.controller.user.user.register);
  app.post('/api/register', app.controller.user.user.register);
  app.post('/api/login', app.controller.user.user.login);
};
