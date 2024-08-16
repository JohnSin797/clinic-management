import { useAuthStore } from "../store/auth";

const store = useAuthStore();

export default function authMiddleware(to, from, next) {
    const isAuthenticated = store.authUser;
    if(to.matched.some(record => record.meta.requiresAuth))
    {
        if(!isAuthenticated)
        {
            next('/sign-in')
        }
        else
        {
            next()
        }
    }
    else if (to.matched.some(record => record.meta.requiresGuest)) {
        if(isAuthenticated) 
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
}