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
        async getToken(token) {
            this.accessToken = token;
        },
        async getUser(user) {
            this.authUser = user;
        },
    },
    persist: true
});