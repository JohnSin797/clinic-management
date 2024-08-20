<template>
    <div>
        <div v-if="this.isOpen" class="fixed w-full h-full flex justify-center items-center top-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
            <section class="w-96 p-10 rounded-lg shadow-xl bg-gray-900">
                <h1 class="text-2xl text-gray-400 mb-5">Retrieve patient information</h1>
                <input 
                    type="text" 
                    name="id_number" 
                    id="id_number"
                    v-model="this.id_number" 
                    class="w-full p-3 mb-4 rounded outline-none ring-2 ring-indigo-600 bg-gray-900" 
                    placeholder="ID number"
                />
                <div class="flex flex-col md:flex-row gap-2 items-center">
                    <button @click="retrievePatient" class="w-full p-3 bg-indigo-600 hover:bg-indigo-500 rounded">find</button>
                    <button @click="handleOnChange" class="w-full p-3 bg-blue-400 hover:bg-indigo-500 rounded">cancel</button>
                </div>
            </section>
        </div>
        <button @click="handleOnChange" class="p-2 rounded bg-indigo-600 space-x-2 hover:text-cyan-400 hover:bg-indigo-900">
            <v-icon name="fa-file-medical" /> 
            <span class="text-xs font-bold">Add new</span>
        </button>
    </div>
</template>

<script>
    import { useMainStore } from '../store/main'
    import Swal from 'sweetalert2'

    export default {
        props: {
            proceedTo: {
                type: String,
                required: false
            }
        },
        data() {
            return {
                isOpen: false,
                id_number: '',
            }
        },
        computed: {
            handleOnChange() {
                this.isOpen = !this.isOpen
                console.log('pressed')
            }
        },
        methods: {
            retrievePatient() {
                const store = useMainStore()
                axios.post('/api/patient/retrieve', {
                    id_number: this.id_number
                })
                .then(response => {
                    if(response.data?.patient) {
                        store.getPatient(response.data?.patient)
                        this.$router.push(`${this.proceedTo}/${response.data?.patient?.id_number}`) 
                    }
                })
                .catch(error => {
                    console.log(error)
                    Swal.fire({
                        title: 'Patient not found',
                        text: 'You will now be redirected to patient create form page.',
                        icon: 'info',
                        showConfirmButton: true,
                        confirmButtonColor: 'blue',
                    })
                    this.$router.push(`/patient/create/${this.id_number}`)
                })
            }
        }
    }
</script>