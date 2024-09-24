import { createRouter, createWebHistory } from "vue-router";
// import authMiddleware from "../middleware/authMiddleware";
import { useAuthStore } from "../store/auth";
import PageNotFound from "../pages/PageNotFound.vue";
import SignIn from "../pages/auth/SignIn.vue";
import SignUp from "../pages/auth/SignUp.vue";
import Home from "../pages/Home.vue";
import Patient from "../pages/patient/Patient.vue";
import CreatePatient from '../pages/patient/Create.vue';
import ViewPatient from '../pages/patient/View.vue';
import EditPatient from "../pages/patient/Edit.vue";
import CreateAssessment from '../pages/assessment/Create.vue';
import Consultation from "../pages/consultation/Consultation.vue";
import CreateConsultation from "../pages/consultation/Create.vue";
import ViewConsultation from "../pages/consultation/View.vue";
import Examination from "../pages/examination/Examination.vue";
import CreateExamination from "../pages/examination/Create.vue";
import Dental from "../pages/dental/Dental.vue";
import CreateDental from "../pages/dental/Create.vue";

const routes = [
    {
        name: 'sign-in',
        path: '/sign-in',
        component: SignIn,
        meta: { Layout: false, requiresGuest: true }
    },
    {
        name: 'sign-up',
        path: '/sign-up',
        component: SignUp,
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
        name: 'patient-edit',
        path: '/patient/edit/:id_number?',
        component: EditPatient,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'patient-view',
        path: '/patient/view/:id_number',
        component: ViewPatient,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'assessment-create',
        path: '/assessment/create/:id_number?',
        component: CreateAssessment,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'consultation',
        path: '/consultation',
        component: Consultation,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'consultation-create',
        path: '/consultation/create/:id_number',
        component: CreateConsultation,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'consultation-view',
        path: '/consultation/view/:consultation_id',
        component: ViewConsultation,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'examination',
        path: '/medical-examination',
        component: Examination,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'examination-create',
        path: '/examination/create/:id_number',
        component: CreateExamination,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'dental-consultation',
        path: '/dental-consultation',
        component: Dental,
        meta: { Layout: true, requiresAuth: true }
    },
    {
        name: 'dental-create',
        path: '/dental/create/:id_number',
        component: CreateDental,
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

// router.beforeEach(authMiddleware);

router.beforeEach((to, from, next) => {
    const store = useAuthStore();
    const isAuth = store.user || null;
    if(to.matched.some(record => record.meta.requiresAuth))
    {
        if(isAuth == null)
        {
            next('/sign-in')
        }
        else
        {
            next()
        }
    }
    else if (to.matched.some(record => record.meta.requiresGuest)) {
        if(isAuth !== null) 
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