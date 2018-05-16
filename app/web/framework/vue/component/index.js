import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Layout from 'component/layout/standard';
import fetch from '../../../../util/fetch'
Vue.prototype.$getQuery = function(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
Vue.use(fetch)
Vue.component(Layout.name, Layout);
