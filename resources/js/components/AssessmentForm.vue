<template>
    <section class="w-96 md:w-3/5 p-10 rounded-lg shadow-xl bg-gray-900 mt-20">
        <h1 class="text-2xl text-gray-400 mb-5">{{ title }}</h1>
        <form action="" @submit.prevent="handleSubmit">
            <div v-for="(input, index) in inputList" :key="index" :class="[input.main_class]">
                <label :class="[input.label_class]" :for="`input-${index}`">{{ input.label }}</label>
                <input 
                    :id="`input-${index}`"
                    :type="[input.input_type]" 
                    :class="[input.input_class]"
                    v-model="this.formData[input.model]"
                    :placeholder="[input.input_placeholder]"
                />
            </div>
            <button type="submit" class="w-full md:w-1/2 p-3 rounded bg-indigo-600 hover:bg-indigo-500">submit</button>
        </form>
    </section>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: false,
            },
            inputList: {
                type: Array,
                required: true,
            },
            onSubmit: {
                type: Function,
                required: true,
            }
        },
        data() {
            return {
                formData: {}
            }
        },
        methods: {
            handleSubmit() {
                this.onSubmit(this.formData)
            }
        }
    }
</script>