
module.exports = app => {
  app.get('/', app.controller.home.home.index);
  app.get('/register', app.controller.user.user.registerWeb);
  app.get('/login', app.controller.user.user.loginWeb);
  app.get('/addproject', app.controller.project.project.addProjectWeb);

  // api
  // 用户相关
  app.post('/api/register', app.controller.user.user.register);
  app.post('/api/login', app.controller.user.user.login);
  app.get('/api/get_users', app.jwt, app.controller.user.user.getUsers)
  // 项目相关
  app.post('/api/create_project', app.jwt, app.controller.project.project.addProject)
  app.get('/api/get_projects', app.jwt, app.controller.project.project.getProjects)
};
