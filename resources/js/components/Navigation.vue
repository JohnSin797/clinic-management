<template>
    <div class="fixed top-0 left-0 w-full flex justify-between items-center p-3 bg-slate-900 border-b px-10 z-10">
        <nav class="flex flex-col md:flex-row gap-5">
            <router-link to="/">Home</router-link>
            <router-link to="/patient">Patient</router-link>
        </nav>
        <button @click="logout" class="">logout</button>
    </div>
</template>

<script>
    export default {
        methods: {
            logout() {
                localStorage.removeItem('clinic-management-token')
                this.$router.push('/sign-in')
            }
        }
    }
</script>