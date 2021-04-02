import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: require('../views/client/Wrapper.vue').default,
        children: [
            {
                path: '',
                name: 'home',
                component: require('../views/client/Home.vue').default
            },
            {
                path: 'menu1',
                name: 'menu1',
                component: require('../views/client/menu/Menu1.vue').default
            },
            {
                path: 'menu2',
                name: 'menu2',
                component: require('../views/client/menu/Menu2.vue').default,
                props: (route) => ({ product_no: route.query.product_no })
            },
            {
                path: 'menu3',
                name: 'menu3',
                component: require('../views/client/menu/Menu3.vue').default
            },
            {
                path: 'menu4',
                name: 'menu4',
                component: require('../views/client/menu/Menu4.vue').default
            },
        ]
    },
    {
        path: '*',
        name: 'catchAll',
        redirect: '/'
    }
]

const router = new VueRouter({
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0, behavior: 'smooth' }
        }
    },
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    routes
})
export default router
