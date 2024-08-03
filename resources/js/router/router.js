import { createRouter, createWebHistory } from "vue-router";
import PageNotFound from "../pages/PageNotFound.vue";
import SignIn from "../pages/auth/SignIn.vue";
import Home from "../pages/Home.vue";
import Patient from "../pages/patient/Patient.vue";
import CreatePatient from '../pages/patient/Create.vue';
import CreateAssessment from '../pages/assessment/Create.vue';

const routes = [
    {
        name: 'sign-in',
        path: '/sign-in',
        component: SignIn,
        meta: { Layout: false, requiresGuest: true }
    },
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
        meta: { Layout: false, requiresAuth: false }
    },
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'patient',
        path: '/patient',
        component: Patient,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'patient-create',
        path: '/patient/create/:id_number?',
        component: CreatePatient,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'assessment-create',
        path: '/assessment/create/:id_number?',
        component: CreateAssessment,
        meta: { Layout: true, requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const itemStr = localStorage.getItem('clinic-management-token');
if (itemStr !== null) {
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem('clinic-management-token');
    }
}

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth))
    {
        if(!isAuthenticated())
        {
            next('/sign-in')
        }
        else
        {
            next()
        }
    }
    else if (to.matched.some(record => record.meta.requiresGuest)) {
        if(isAuthenticated()) 
        {
            next('/')
        }
        else
        {
            next()
        }
    }
    else {
        next()
    }
})

function isAuthenticated() {
    return localStorage.getItem('clinic-management-token') !== null;
}

export default router;