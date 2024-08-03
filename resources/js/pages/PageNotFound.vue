<template>
    <div class="flex justify-center items-center bg-gray-900 min-h-screen w-full">
        <section class="p-10 w-96 bg-gray-800 rounded-lg shadow-xl">
            <h1 class="text-2xl text-white mb-5">Page not found</h1>
            <button @click="goBack" class="p-3 rounded bg-indigo-600 hover:bg-indigo-500 text-white w-full">go back</button>
        </section>
    </div>
</template>

<script>
    export default {
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>