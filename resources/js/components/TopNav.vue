<template>
    <div class="flex justify-between items-center px-6 p-3 bg-gray-800 w-full md:w-5/6 fixed right-0 top-0 text-gray-200 z-11">
        <p class="font-bold">{{ full_name }}</p>
        <button class="md:hidden" @click="onChangeMenu">menu</button>
        <button class="hidden md:block">logout</button>
    </div>
</template>

<script>
    import { useAuthStore } from '../store/auth';

    export default {
        data() {
            return {
                full_name: '',
            }
        },
        methods: {
            getFullName() {
                const store = useAuthStore()
                const user = store.authUser
                this.full_name = user.first_name + ' ' + user.last_name
            },
            onChangeMenu() {
                this.$emit('handleMenu')
            }
        },
        mounted() {
            this.getFullName()
        }
    }
</script>