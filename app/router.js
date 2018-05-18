
module.exports = app => {
  app.get('/', app.controller.home.home.index);
  app.get('/register', app.controller.user.user.registerWeb);
  app.get('/login', app.controller.user.user.loginWeb);
  app.get('/addproject', app.controller.project.project.addProjectWeb);
  app.get('/updateproject', app.controller.project.project.updateProjectWeb);
  app.get('/apilist', app.controller.api.api.apiListWeb);
  app.get('/createupdateapi', app.controller.api.api.createUpdateWeb);

  // api
  // 用户相关
  app.post('/api/register', app.controller.user.user.register);
  app.post('/api/login', app.controller.user.user.login);
  app.get('/api/get_users', app.jwt, app.controller.user.user.getUsers)
  // 项目相关
  app.post('/api/create_project', app.jwt, app.controller.project.project.addProject)
  app.get('/api/get_projects', app.jwt, app.controller.project.project.getProjects)
  app.post('/api/delete_project', app.jwt, app.controller.project.project.deleteProject)
  app.put('/api/update_project/:id', app.jwt, app.controller.project.project.updateProject)
};
