<template>
    <div class="flex flex-col items-center w-full min-h-screen">
        <section class="w-96 md:w-4/5 min-h-80 p-10 rounded-lg shadow-xl bg-gray-900 mt-20">
            <div class="flex justify-between items-center mb-5">
                <h1 class="text-2xl text-gray-400">Consultations</h1>
                <CreateNew proceedTo="/consultation/create" />
            </div>
            <DataTable :headers="this.tableHeaders" :rows="this.consultations" :index="this.tableIndex" />
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
                tableHeaders: ['name', 'employment_status', 'department', 'last_visit'],
                tableIndex: ['name', 'employment_status', 'department', 'created_at'],
                consultations: [{}],
                tableActions: [
                    {name: 'View', class: 'p-2 rounded bg-blue-400 hover:bg-indigo-900 font-bold', destination: '/consultation/view/'}
                ]
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
                    
                })
            }
        },
        mounted() {
            this.getConsultations()
        }
    }
</script>