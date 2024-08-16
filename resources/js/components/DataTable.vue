<template>
    <div class="w-full max-h-96 relative overflow-y-auto">
        <table class="w-full table-fixed text-center">
            <thead class="p-2 bg-black sticky top-0">
                <tr>
                    <th v-for="(header, index) in capitalizedHeaders" :key="index">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b" v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td class="p-4 text-sm" v-for="(header, colIndex) in headers" :key="colIndex" :class="[header, header == 'employment_status' && row[header]]">
                        {{ this.formatValue(row[header]) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
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