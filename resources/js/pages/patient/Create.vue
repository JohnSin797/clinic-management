<template>
    <div class="flex justify-center items-center w-full min-h-screen">
        <section class="w-96 md:w-3/5 p-10 rounded-lg shadow-xl bg-gray-900 mt-20">
            <h1 class="text-2xl text-gray-400 mb-5">Patient Information</h1>
            <div class="flex flex-col md:flex-row gap-4 text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="first_name" class="text-xs font-bold w-full">First name:</label>
                    <input 
                        type="text" 
                        name="first_name" 
                        id="first_name" 
                        v-model="this.first_name"
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        placeholder="First name"
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="last_name" class="text-xs font-bold">Last name:</label>
                    <input 
                        type="text" 
                        name="last_name" 
                        id="last_name" 
                        v-model="this.last_name"
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        placeholder="Last name"
                    />
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4 text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="date_of_birth" class="text-xs font-bold">Date of birth:</label>
                    <input 
                        type="date" 
                        name="date_of_birth" 
                        v-model="this.date_of_birth"
                        id="date_of_birth" 
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="employment_status" class="text-xs font-bold">Employment Status:</label>
                    <select v-model="this.employment_status" name="employment_status" id="employment_status" class="w-full rounded bg-gray-900 outline-none p-2" >
                        <option value="student">Student</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="id_number" class="text-xs font-bold">ID number:</label>
                    <input 
                        type="text" 
                        name="id_number" 
                        id="id_number" 
                        v-model="this.id_number" 
                        :readonly="this.is_id_num_null"
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                    />
                </div>
            </div>
            <button @click="createPatient" class="w-full md:w-1/2 p-3 rounded bg-indigo-600 hover:bg-indigo-500">Create</button>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
import Swal from 'sweetalert2';
    export default {
        data() {
            return {
                first_name: '',
                last_name: '',
                date_of_birth: '',
                employment_status: 'student',
                id_number: '',
                is_id_num_null: false
            }
        },
        created() {
            this.setIdNumber()
        },
        watch: {
            '$route.params.id_number': function(newId) {
                this.id_number = newId
                this.is_id_num_null = newId != null ? true : false
            }
        },
        methods: {
            setIdNumber() {
                const r = this.$route.params.id_number
                this.id_number = this.$route.params.id_number
                this.is_id_num_null = (r == null || r == '' ? false : true)
            },
            createPatient() {
                axios.post('/api/patient/store', {
                    id_number: this.id_number,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    date_of_birth: this.date_of_birth,
                    employment_status: this.employment_status,
                })
                .then(response => {
                    Swal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success',
                        showConfirmButton: true,
                    })
                    this.$router.push(`/assessment/create/${response.data?.patient?.id_number}`)
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>