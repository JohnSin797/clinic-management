<template>
    <div class="flex justify-center items-center min-h-screen w-full bg-gray-900">
        <section class="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
            <form action="" class="" @submit.prevent="handleSubmit">
                <h1 class="text-white text-2xl mb-5">Sign In</h1>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    class="w-full p-3 mb-4 rounded bg-gray-700 outline-none text-white placeholder-gray-500" 
                    placeholder="Email"
                    v-model="this.email"
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    class="w-full p-3 mb-4 rounded bg-gray-700 outline-none text-white placeholder-gray-500" 
                    placeholder="Password"
                    v-model="this.password"
                    required
                />
                <button type="submit" class="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 mb-5">sign in</button>
                <p class="text-center text-xs">
                    Register an account? 
                    <router-link to="/sign-up" class="text-xs text-center hover:text-cyan-400 font-bold">sign up</router-link>
                </p>
            </form>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import { useAuthStore } from '../../store/auth';
    axios.defaults.withCredentials = true;
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            handleSubmit() {
                const store = useAuthStore()
                axios.post('/user/login', {
                    email: this.email,
                    password: this.password
                })
                .then(response=>{
                    const token = response.data.access_token
                    const user = response.data.user
                    store.getToken(token)
                    store.getUser(user)
                    this.$router.push('/')
                })
                .catch(error=>{
                    console.log(error)
                    Swal.fire({
                        title: 'Login error',
                        text: '',
                        icon: 'error'
                    })
                })
            }
        }
    }
</script>