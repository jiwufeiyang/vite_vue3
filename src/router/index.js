/*
 * @Author: 伍习文
 * @Date: 2021-12-28 09:56:16
 * @Description: 路由配置
 */
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        meta: {
            keepAlive: false,
            title: '更多应用'
        },
        component: () => import('@/views/Index.vue')
    },
    {
        path: '/setup',
        meta: {
            keepAlive: false,
            title: '组合语法'
        },
        component: () => import('@/views/setup.vue')
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
