import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Layout from 'component/layout/standard';

Vue.component(Layout.name, Layout);
