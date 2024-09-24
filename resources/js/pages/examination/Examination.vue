<template>
    <div class="flex flex-col items-center w-full min-h-screen">
        <section class="w-96 md:w-4/5 min-h-80 p-10 rounded-lg shadow-xl bg-gray-900 mt-20">
            <div class="flex justify-between items-center mb-5">
                <h1 class="text-2xl text-gray-400">Medical Examination</h1>
                <CreateNew proceedTo="/examination/create" />
            </div>
            <DataTable :headers="this.tableHeaders" :rows="this.examinations" />
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import CreateNew from '../../components/CreateNew.vue';
import DataTable from '../../components/DataTable.vue';

    export default {
        data() {
            return {
                tableHeaders: ['name', 'employment_status', 'department', 'last_visit'],
                examinations: [{}]
            }
        },
        components: {
            CreateNew, DataTable
        },
        methods: {
            getExaminations() {
                axios.get('/examination')
                .then(response => {
                    this.examinations = response.data?.examinations || [{}]
                })
                .catch(error => {
                    console.log(error)
                })
                .finally()
            }
        },
        mounted() {
            this.getExaminations()
        }
    }
</script>