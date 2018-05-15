import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Layout from 'component/layout/standard';
import fetch from '../../../../util/fetch'
Vue.use(fetch)
Vue.component(Layout.name, Layout);
