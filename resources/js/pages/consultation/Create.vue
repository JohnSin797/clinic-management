<template>
    <form class="w-full" @submit.prevent="submitConsultationForm">
        <div class="flex flex-col justify-center items-center w-full min-h-screen gap-10 py-20">
            <!-- <AssessmentForm title="Assessment" :inputList="this.input_list" :onSubmit="this.submitConsultationForm" /> -->
            <section class="w-96 md:w-4/5 rounded-lg shadow-xl p-10 bg-gray-900">
                <header class="mb-5 text-gray-200">
                    <h1 class="text-2xl font-bold">Patient Information</h1>
                </header>
                <div class="w-full space-y-2 text-slate-900">
                    <div class="w-full flex flex-col md:flex-row items-center justify-center gap-2">
                        <div class="group w-full md:w-1/3">
                            <label for="blood_type" class="text-xs text-gray-400 font-bold">Blood Type:</label>
                            <input 
                                type="text" 
                                name="blood_type" 
                                id="blood_type" 
                                class="w-full p-2 rounded"
                                placeholder="Blood type"
                                v-model="this.patient.blood_type"
                            />
                        </div>
                        <div class="group w-full md:w-1/3">
                            <label for="height" class="text-xs text-gray-400 font-bold">Height:</label>
                            <input 
                                type="text" 
                                name="height" 
                                id="height" 
                                class="w-full p-2 rounded"
                                placeholder="Height"
                                v-model="this.patient.height"
                            />
                        </div>
                        <div class="group w-full md:w-1/3">
                            <label for="weight" class="text-xs text-gray-400 font-bold">Weight:</label>
                            <input 
                                type="text" 
                                name="weight" 
                                id="weight" 
                                class="w-full p-2 rounded"
                                placeholder="Weight"
                                v-model="this.patient.weight"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section class="w-96 md:w-4/5 rounded-lg shadow-xl p-10 bg-gray-900">
                <header class="mb-5 text-gray-200">
                    <h1 class="text-2xl font-bold">Assessment</h1>
                </header>
                <div class="w-full space-y-2 text-slate-900">
                    <div class="w-full flex flex-col md:flex-row items-center justify-center gap-2">
                        <div class="group w-full md:w-1/2">
                            <label for="temperature" class="text-xs text-gray-400 font-bold">Temperature:</label>
                            <input type="text" name="" id="" class="w-full p-2 rounded" placeholder="Temperature" />
                        </div>
                        <div class="group w-full md:w-1/2">
                            <label for="blood_pressure" class="text-xs text-gray-400 font-bold">Blood Pressure:</label>
                            <input type="text" name="" id="" class="w-full p-2 rounded" placeholder="Blood Pressure" />
                        </div>
                    </div>
                    <div class="w-full">
                        <label for="" class="text-xs text-gray-400 font-bold">Complaint:</label>
                        <textarea name="" id="" ows="3" class="w-full p-2 rounded resize-none" placeholder="Type here..."></textarea>
                    </div>
                </div>
            </section>
            <section class="w-96 md:w-4/5 rounded-lg shadow-xl p-10 bg-gray-900">
                <header class="mb-5 text-gray-200">
                    <h1 class="text-2xl font-bold">Treatment</h1>
                </header>
                <div class="w-full space-y-2 text-slate-900">
                    <div class="group space-y-2">
                        <label for="prescription" class="text-xs text-gray-400 font-bold">Prescription:</label>
                        <div class="w-full flex gap-2 items-center justify-center" v-for="(prescription, index) in this.prescriptions" :key="index">
                            <input 
                                type="text" 
                                :name="index" 
                                :id="index" 
                                class="w-full p-2 rounded" 
                                v-model="prescriptions[index]"
                            />
                            <button 
                                type="button" 
                                v-if="index==0" 
                                class="p-2 rounded bg-green-600 hover:bg-green-900 text-white font-bold"
                                @click.prevent="addPrescription"
                            >
                                <v-icon name="fa-plus" />
                            </button>
                            <button 
                                type="button" 
                                v-else 
                                class="p-2 rounded bg-red-600 hover:bg-red-900 text-white font-bold"
                                @click.prevent="deletePrescription(index)"
                            >
                                <v-icon name="fa-trash" />
                            </button>
                        </div>
                        <button type="submit" class="w-full md:w-1/5 p-2 rounded bg-indigo-600 hover:bg-indigo-900 text-white hover:text-cyan-400 font-bold">
                            <v-icon name="fa-file-medical" />
                            Create
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </form>
</template>

<script>
    import axios from 'axios';
    import AssessmentForm from '../../components/AssessmentForm.vue';
    import Swal from 'sweetalert2';

    export default {
        data() {
            return {
                input_list: [
                    {
                        main_class: '', 
                        label: '', 
                        label_class: '', 
                        input_type: '', 
                        input_class: '', 
                        input_model: '', 
                        input_placeholder: '',
                    },
                ],
                prescriptions: [''],
                patient: {
                    id: '',
                    blood_type: '',
                    height: '',
                    weight: '',
                },
            }
        },
        components: {
            AssessmentForm
        },
        methods: {
            addPrescription() {
                var temp = this.prescriptions
                temp.push('')
                this.prescriptions = temp
            },
            deletePrescription(index) {
                var temp = this.prescriptions
                temp.splice(index, 1)
                this.prescriptions = temp
            },
            submitConsultationForm(formData) {
                axios.post('/consultation/store', {
                    patient_id: this.patient.id,
                    blood_type: this.patient.blood_type,
                    height: this.patient.height,
                    weight: this.patient.weight,
                    
                })
                .then(response => {
                    Swal.fire({
                        title: 'Success',
                        text: 'You have successfully created a new Consultation Form',
                        icon: 'success',
                        showConfirmButton: true,
                    })
                })
                .catch(error => {
                    console.log(error)
                    Swal.fire({
                        title: 'Error',
                        text: error.response.message,
                        icon: 'error'
                    })
                })
            },
            getPatient() {
                const id = this.$route.params.id_number
                axios.post('/api/patient/retrieve', {
                    id_number: id
                })
                .then(response => {
                    this.patient = response.data?.patient
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        mounted() {
            this.getPatient()
        },
    }
</script>