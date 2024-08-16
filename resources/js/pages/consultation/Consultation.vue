<template>
    <div class="flex flex-col items-center w-full min-h-screen">
        <section class="w-96 md:w-4/5 min-h-80 p-10 rounded-lg shadow-xl bg-gray-900 mt-20">
            <div class="flex justify-between items-center mb-5">
                <h1 class="text-2xl text-gray-400">Consultations</h1>
                <CreateNew />
                <!-- <button class="p-2 rounded bg-indigo-600 space-x-2 hover:text-cyan-400 hover:bg-indigo-900">
                    <v-icon name="fa-file-medical" /> 
                    <span class="text-xs font-bold">Add new</span>
                </button> -->
            </div>
            <DataTable :headers="this.tableHeaders" :rows="this.consultations" />
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import DataTable from '../../components/DataTable.vue';
import CreateNew from '../../components/CreateNew.vue';

    export default {
        data() {
            return {
                tableHeaders: ['name', 'employment_status', 'department', 'date_created'],
                consultations: [{}]
            }
        },
        components: {
            DataTable, CreateNew
        },
        methods: {
            getConsultations() {
                axios.get('/consultation')
                .then(response => {
                    this.consultations = response.data?.consultations || [{}];
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(()=>{
                    console.log('fin')
                })
            }
        },
        mounted() {
            this.getConsultations()
        }
    }
</script>