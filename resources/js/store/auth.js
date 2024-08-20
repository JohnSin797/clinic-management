import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        accessToken: null
    }),
    getters: {
        user: (state) => state.authUser,
        token: (state) => state.accessToken,
    },
    actions: {
        getToken(token) {
            this.accessToken = token;
        },
        getUser(user) {
            this.authUser = user;
        },
    },
    persist: true
});