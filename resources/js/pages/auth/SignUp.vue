<template>
    <div class="w-full min-h-screen flex justify-center items-center bg-gray-900">
        <section class="w-96 md:w-3/5 rounded-lg shadow-xl p-10 bg-gray-800">
            <header class="mb-5 text-white">
                <h1 class="text-2xl">Sign Up</h1>
            </header>
            <form>
                <div class="w-full space-y-2">
                    <div class="flex flex-col md:flex-row items-center gap-2">
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            class="p-3 w-full rounded bg-gray-700 outline-none text-white"
                            placeholder="First name"
                        />
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            class="p-3 w-full rounded bg-gray-700 outline-none text-white"
                            placeholder="Last name"
                        />
                    </div>
                    <input 
                            type="text" 
                            name="" 
                            id="" 
                            class="p-3 w-full rounded bg-gray-700 outline-none text-white" 
                            placeholder="Email"
                        />
                    <div class="w-full flex flex-col md:flex-row gap-2">
                        <input 
                            type="password" 
                            name="" 
                            id="" 
                            class="p-3 w-full rounded bg-gray-700 outline-none text-white" 
                            placeholder="Password" 
                        />
                        <input 
                            type="password" 
                            name="" 
                            id="" 
                            class="p-3 w-full rounded bg-gray-700 outline-none text-white" 
                            placeholder="Confirm Password" 
                        />
                    </div>
                    <button type="submit" class="w-full md:w-1/5 p-3 rounded bg-indigo-600 hover:bg-indigo-900 text-white font-bold">Sign up</button>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../../store/auth';

    export default {
        data() {
            return {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        },
        methods: {
            handleSignUp() {
                const store = useAuthStore()
                axios.post('/user/register', {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                })
                .then(response => {
                    store.getUser(response.data?.user)
                    this.$router.push('/')
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>