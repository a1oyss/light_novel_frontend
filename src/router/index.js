import Vue from "vue";
import VueRouter from "vue-router";
import AppIndex from "../components/AppIndex";
import Home from "../components/Home";
import LibraryIndex from "../components/library/LibraryIndex";
import Blog from "../components/blog/Blog";
import ShowBook from "../components/library/ShowBook";
import BookInfo from "../components/library/BookInfo";

Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path:'/home',
            name:'Home',
            component:Home,
            redirect:'/index',
            children:[
                {
                    path:'/index',
                    name:'AppIndex',
                    component:AppIndex,
                },
                {
                    path:'/library',
                    name:'Library',
                    component:LibraryIndex,
                },
                {
                    path:'/blog',
                    name:'Blog',
                    component:Blog
                },
                {
                    path:'/showBook',
                    name:'ShowBook',
                    component:ShowBook
                },
                {
                    path:'/book/:id/',
                    name:'BookInfo',
                    component:BookInfo
                }
            ]
        }
    ]
})