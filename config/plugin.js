exports.static = true;

exports.vuessr = {
  enable: true,
  package: 'egg-view-vue-ssr'
};
exports.serviceworker = {
  enable: true,
  package: 'egg-serviceworker'
};
exports.validate = {
  package: 'egg-validate',
};
exports.jwt = {
  enable: true,
  package: 'egg-jwt'
};