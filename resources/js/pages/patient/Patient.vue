<template>
    <div class="w-full min-h-screen flex flex-col justify-center items-center">
        <section class="w-96 md:w-4/5 min-h-80 p-10 rounded-lg shadow-xl bg-gray-900 mt-20">
            <div class="flex justify-between items-center mb-5">
                <h1 class="text-2xl text-gray-400">Patients</h1>
                <router-link to="/patient/create" class="block p-2 rounded bg-indigo-600 space-x-2 hover:text-cyan-400 hover:bg-indigo-900">
                    <v-icon name="fa-file-medical" /> 
                    <span class="text-xs font-bold">Add new</span>
                </router-link>
            </div>
            <DataTable :headers="this.tableHeaders" :rows="this.patients" :index="this.tableIndex" @itemDeleted="removeItem" destination="patient" />
        </section>
        <section class="min-h-screen">
            asd
        </section>
    </div>
</template>

<script>
    import DataTable from '../../components/DataTable.vue';
    import axios from 'axios';
    export default {
        data() {
            return {
                tableHeaders: ['name', 'ID number', 'employment_status', 'department', 'last_visit'],
                tableIndex: ['name', 'id_number', 'employment_status', 'department', 'last_visit'],
                patients: [{}]
            }
        },
        components: {
            DataTable
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
            },
            removeItem(id) {
                this.patients = this.patients.filter(item => item.id_number !== id)
            }
        }
    }
</script>