import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Employee from "../components/Employee.vue";
import Rappizas from "../components/Rappizas.vue";
import Login from "../components/Login.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/rapizzas',
        name: 'rapizzas',
        component: Rappizas
    },

    {
        path: '/employee',
        name: 'employeeRegister',
        component: Employee
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition){
        return savedPosition ?? {top: 0}
    }
})

export default router