import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "../stores/user"
import Home from "@/views/Home.vue"

const requireAuth = async(to,before,next) => {
    const userStore = useUserStore();
    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    if (user){
        next();
    } else {
        next("/login");
    }
    userStore.loadingSession = false;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: requireAuth
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    }
  ]
})

export default router
