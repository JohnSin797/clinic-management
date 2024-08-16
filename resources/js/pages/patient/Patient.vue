<template>
    <div class="w-full min-h-screen flex flex-col justify-center items-center">
        <section class="w-96 md:w-4/5 min-h-80 p-10 rounded-lg shadow-xl bg-gray-900 mt-20">
            <h1 class="text-2xl text-gray-400 mb-5">Patients</h1>
            <table class="w-full table-fixed">
                <thead class="bg-black sticky top-12 text-gray-300">
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Department</th>
                        <th>Last visit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-for="(patient, key) in this.patients" :key="key">
                        <td class="p-4 text-sm font-bold text-blue-400">{{ patient.first_name }} {{ patient.last_name }}</td>
                        <td class="p-4 text-sm" :class="[patient.employment_status == 'student' ? 'text-green-400' : 'text-violet-600']">{{ patient.employment_status }}</td>
                        <td class="p-4 text-sm text-orange-400">{{ patient.department }}</td>
                        <td class="p-4 text-sm text-indigo-600">{{ patient.last_visit }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                patients: [{}]
            }
        },
        mounted() {
            this.getPatients()
        },
        methods: {
            getPatients() {
                axios.get('/api/patient/index')
                .then(response => {
                    console.log(response)
                    this.patients = response?.data?.patients
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>