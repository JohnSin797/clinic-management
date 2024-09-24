<template>
    <div class="w-full h-80 2xl:h-96 relative overflow-y-auto">
        <table class="w-full table-auto md:table-fixed text-center">
            <thead class="bg-black sticky top-0">
                <tr>
                    <th class="p-1" v-for="(header, index) in capitalizedHeaders" :key="index">
                        {{ header }}
                    </th>
                    <th class="p-1" v-if="destination">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b" v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td class="p-4 text-sm" v-for="(header, colIndex) in index" :key="colIndex" :class="[header, header == 'employment_status' && row[header]]">
                        {{ this.formatValue(row[header]) }}
                    </td>
                    <td v-if="destination">
                        <div class="flex flex-wrap gap-2 p-4 text-xs">
                            <router-link class="block p-2 rounded w-full md:max-w-1/3 bg-blue-400 hover:bg-indigo-900 font-bold" :to="`/${destination}/view/${row.id}`">
                                View
                            </router-link>
                            <router-link class="block p-2 rounded w-full md:max-w-1/3 bg-green-600 hover:bg-green-900 font-bold" :to="`/${destination}/edit/${row.id}`">
                                Edit
                            </router-link>
                            <button class="p-2 rounded w-full md:max-w-1/3 bg-red-400 hover:bg-red-900 font-bold" @click="confirmDelete(row.id_number)">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';

    export default {
        name: "DataTable",
        props: {
            headers: {
                type: Array,
                required: true,
            },
            rows: {
                type: Array,
                required: true,
            },
            index: {
                type: Array,
                required: true,
            },
            destination: {
                type: String,
                required: false,
            }
        },
        data() {
            return {
                loading: true,
            }
        },
        computed: {
            capitalizedHeaders() {
                return this.headers.map(header =>
                    header
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                );
            },
        },
        methods: {
            formatValue(value) {
                const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

                if (isoDateTimeRegex.test(value)) {
                    const date = new Date(value);
                    const day = String(date.getUTCDate()).padStart(2, '0');
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const year = date.getUTCFullYear();
                    const hours = String(date.getUTCHours()).padStart(2, '0');
                    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
                    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                }

                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

                if (dateRegex.test(value)) {
                    const [year, month, day] = value.split('-');
                    return `${day}-${month}-${year}`;
                } else if (dateTimeRegex.test(value)) {
                    const [datePart, timePart] = value.split(' ');
                    const [year, month, day] = datePart.split('-');
                    return `${day}-${month}-${year} ${timePart}`;
                }

                return value;
            },
            confirmDelete(id) {
                Swal.fire({
                    title: 'Delete',
                    text: 'Are you sure you want to continue?',
                    icon: 'question',
                    showConfirmButton: true,
                    confirmButtonColor: 'blue',
                    showCancelButton: true,
                    cancelButtonColor: 'red',
                })
                .then(response => {
                    if(response.isConfirmed) {
                        this.handleDelete(id)
                    }
                })
            },
            handleDelete(id) {
                axios.post(`/api/${this.destination}/delete`, {id_number: id})
                .then(() => {
                    this.$emit('itemDeleted', id)
                    Swal.fire({
                        title: 'Successfully Deleted',
                        icon: 'success',
                    })
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style>
.name {
    color: rgb(96 165 250);
    font-weight: bold;
}
.student {
    color: rgb(74 222 128);
}
.teacher {
    color: rgb(124 58 237);
}
.department {
    color: rgb(251 146 60);
}
.date_created {
    color: rgb(79 70 229);
}
</style>