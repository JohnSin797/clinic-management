<template>
    <div class="flex justify-center items-center w-full min-h-screen">
        <section class="w-96 p-10 rounded-lg shadow-xl bg-gray-900">
            <h1 class="text-2xl text-gray-400 mb-5">Retrieve patient information</h1>
            <input 
                type="text" 
                name="id_number" 
                id="id_number"
                v-model="this.id_number" 
                class="w-full p-3 mb-4 rounded outline-none ring-2 ring-indigo-600 bg-gray-900" 
                placeholder="ID number"
            />
            <button @click="retrievePatient" class="w-full p-3 mb-4 bg-indigo-600 hover:bg-indigo-500 rounded">find</button>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    export default {
        data() {
            return {
                id_number: ''
            }
        },
        methods: {
            retrievePatient() {
                axios.post('/api/patient/retrieve', {
                    id_number: this.id_number
                })
                .then(response => {
                    if(response.data?.patient) {
                        this.$router.push(`/assessment/create/${response.data?.patient?.id_number}`)
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Patient not found',
                        text: 'You will now be redirected to patient create form page.',
                        icon: 'info',
                        showConfirmButton: true,
                        confirmButtonColor: 'blue',
                    })
                    this.$router.push(`/patient/create/${this.id_number}`)
                })
            }
        }
    }
</script>