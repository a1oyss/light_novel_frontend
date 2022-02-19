import Vue from "vue";
import router from './router'
import App from "./App";
import axios from "axios"
import ElementUi from "element-ui"
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL='http://localhost:8443/api/'
Vue.prototype.$axios=axios
Vue.config.productionTip=false
Vue.use(ElementUi)

new Vue({
    el:'#app',
    router,
    store,
    components:{
        App
    },
    template:'<App/>'
})