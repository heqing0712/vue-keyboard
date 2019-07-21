import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRouterMap = [

    {
        path: '/',
        component: () => import('@/pages/index'),
        meta: {
            title:"车牌号码输入"
        }
    },

    {
        path: '*',
        redirect: '/',
        hidden: true
    }


];


const router = new Router({
    mode: "history",
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
});

router.beforeEach((to, from, next) => {

    //如果设置标题，拦截后设置标题
    if (to.meta.title) { 
        document.title = to.meta.title
    }

    //判断该路由是否需要登录权限         
    //通过vuex state获取当前的token是否存在
    if (to.meta.requireAuth) {

    }

    else {
        next();
    }


})

export default router