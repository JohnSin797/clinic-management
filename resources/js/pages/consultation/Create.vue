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
                    <div class="group rounded p-3 w-full">
                        <label class="text-xs font-bold text-gray-400">Food allergy:</label>
                        <div v-for="(food, idx) in this.patient.food_allergy" class="flex justify-center items-center gap-4 mb-2">
                            <input 
                                type="text" 
                                name="food_allergy" 
                                id="food_allergy" 
                                class="w-full rounded outline-none p-2 ring-2 ring-gray-400 focus:ring-indigo-600" 
                                v-model="this.patient.food_allergy[idx]"
                            />
                            <button v-if="idx == 0" @click="addItem('food_allergy')" class="p-2 rounded text-white bg-green-400 hover:bg-green-600">
                                <v-icon name="fa-plus" />
                            </button>
                            <button v-else @click.prevent="deleteItem(idx, 'food_allergy')" class="p-2 rounded text-white bg-red-400 hover:bg-red-600">
                                <v-icon name="fa-trash" />
                            </button>
                        </div>
                    </div>
                    <div class="group rounded p-3 w-full">
                        <label class="text-xs font-bold text-gray-400">Medicine allergy:</label>
                        <div v-for="(medicine, idx) in this.patient.medicine_allergy" class="flex justify-center items-center gap-4 mb-2">
                            <input 
                                type="text" 
                                name="medicine_allergy" 
                                id="medicine_allergy" 
                                class="w-full rounded outline-none p-2 ring-2 ring-gray-400 focus:ring-indigo-600" 
                                v-model="this.patient.medicine_allergy[idx]"
                            />
                            <button v-if="idx == 0" @click="addItem('medicine_allergy')" class="p-2 rounded text-white bg-green-400 hover:bg-green-600">
                                <v-icon name="fa-plus" />
                            </button>
                            <button v-else @click.prevent="deleteItem(idx, 'medicine_allergy')" class="p-2 rounded text-white bg-red-400 hover:bg-red-600">
                                <v-icon name="fa-trash" />
                            </button>
                        </div>
                    </div>
                    <div class="group rounded p-3 w-full">
                        <label class="text-xs font-bold text-gray-400">Other allergy:</label>
                        <div v-for="(other, idx) in this.patient.other_allergy" class="flex justify-center items-center gap-4 mb-2">
                            <input 
                                type="text" 
                                name="other_allergy" 
                                id="other_allergy" 
                                class="w-full rounded outline-none p-2 ring-2 ring-gray-400 focus:ring-indigo-600" 
                                v-model="this.patient.other_allergy[idx]"
                            />
                            <button v-if="idx == 0" @click="addItem('other_allergy')" class="p-2 rounded text-white bg-green-400 hover:bg-green-600">
                                <v-icon name="fa-plus" />
                            </button>
                            <button v-else @click.prevent="deleteItem(idx, 'other_allergy')" class="p-2 rounded text-white bg-red-400 hover:bg-red-600">
                                <v-icon name="fa-trash" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section class="w-96 md:w-4/5 rounded-lg shadow-xl p-10 bg-gray-900">
                <header class="mb-5 text-gray-200">
                    <h1 class="text-2xl font-bold">Assessment</h1>
                </header>
                <div class="w-full space-y-4 text-slate-900">
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
                    <div class="w-full flex flex-col md:flex-row items-center justify-center gap-2">
                        <div class="group w-full md:w-1/4 flex gap-2">
                            <label for="is_pregnant" class="text-xs text-gray-400 font-bold">Pergnant:</label>
                            <input type="checkbox" class="w-4 h-4" name="is_pregnant" id="is_pregnant" v-model="is_pregnant" />
                        </div>
                        <div class="group w-full md:w-1/4 flex gap-2">
                            <label for="is_disabled" class="text-xs text-gray-400 font-bold">Disabled:</label>
                            <input type="checkbox" class="w-4 h-4" name="is_disabled" id="is_disabled" v-model="is_disabled" />
                        </div>
                        <div class="group w-full md:w-1/4 flex gap-2">
                            <label for="is_operated" class="text-xs text-gray-400 font-bold">Operated:</label>
                            <input type="checkbox" class="w-4 h-4" name="is_operated" id="is_operated" v-model="is_operated" />
                        </div>
                        <div class="group w-full md:w-1/4 flex gap-2">
                            <label for="is_hospitalized" class="text-xs text-gray-400 font-bold">Hospitalized:</label>
                            <input type="checkbox" class="w-4 h-4" name="is_hospitalized" id="is_hospitalized" v-model="is_hospitalized" />
                        </div>
                    </div>
                    <div class="w-full flex flex-col md:flex-row items-center justify-center gap-2">
                        <div class="w-full md:w-1/6">
                            <p class="text-xs text-gray-400 font-bold">if operated:</p>
                        </div>
                        <div class="group w-full md:w-1/3">
                            <label for="date_of_operation" class="text-xs text-gray-400 font-bold">Date of Operation:</label>
                            <input type="date" name="date_of_operation" id="date_of_operation" class="w-full p-2 rounded" :disabled="!is_operated" v-model="date_of_operation" />
                        </div>
                        <div class="group w-full md:w-1/3">
                            <label for="type_of_operation" class="text-xs text-gray-400 font-bold">Type of Operation:</label>
                            <input type="text" name="type_of_operation" id="type_of_operation" class="w-full p-2 rounded" :disabled="!is_operated" v-model="type_of_operation" />
                        </div>
                        <div class="group w-full md:w-1/3">
                            <label for="hospital_name_operation" class="text-xs text-gray-400 font-bold">Hospital Name:</label>
                            <input type="text" name="hospital_name_operation" id="hospital_name_operation" class="w-full p-2 rounded" :disabled="!is_operated" v-model="hospital_name_operation" />
                        </div>
                    </div>
                    <div class="w-full flex flex-col md:flex-row items-center justify-center gap-2">
                        <div class="w-full md:w-1/6">
                            <p class="text-xs text-gray-400 font-bold">if hospitalized:</p>
                        </div>
                        <div class="group w-full md:w-1/3">
                            <label for="hospital_name_confined" class="text-xs text-gray-400 font-bold">Hospital Name:</label>
                            <input type="text" name="hospital_name_confined" id="hospital_name_confined" class="w-full p-2 rounded" :disabled="!is_hospitalized" v-model="hospital_name_confined"/>
                        </div>
                        <div class="group w-full md:w-1/3">
                            <label for="physician" class="text-xs text-gray-400 font-bold">Physician:</label>
                            <input type="text" name="physician" id="physician" class="w-full p-2 rounded" :disabled="!is_hospitalized" v-model="physician" />
                        </div>
                        <div class="group w-full md:w-1/3">
                            <label for="diagnosis" class="text-xs text-gray-400 font-bold">Diagnosis:</label>
                            <input type="text" name="diagnosis" id="diagnosis" class="w-full p-2 rounded" :disabled="!is_hospitalized" v-model="diagnosis" />
                        </div>
                    </div>
                    <div class="w-full">
                        <label for="past_present_illness" class="text-xs text-gray-400 font-bold">Past Illness:</label>
                        <textarea 
                            name="past_present_illness" 
                            id="past_present_illness" 
                            rows="2" 
                            class="w-full p-2 rounded resize-none" 
                            placeholder="Type here..."
                            v-model="past_present_illness"
                        ></textarea>
                    </div>
                    <div class="w-full">
                        <label for="illness" class="text-xs text-gray-400 font-bold">Past Illness:</label>
                        <textarea 
                            name="illness" 
                            id="illness" 
                            rows="2" 
                            class="w-full p-2 rounded resize-none" 
                            placeholder="Type here..."
                            v-model="illness"
                        ></textarea>
                    </div>
                    <div class="w-full">
                        <label for="" class="text-xs text-gray-400 font-bold">Complaint:</label>
                        <textarea name="" id="" rows="3" class="w-full p-2 rounded resize-none" v-model="complaint" placeholder="Type here..."></textarea>
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
                    food_allergy: [''],
                    medicine_allergy: [''],
                    other_allergy: [''],
                },
                is_pregnant: false,
                is_disabled: false,
                past_present_illness: '',
                illness: '',
                is_operated: false,
                date_of_operation: '',
                type_of_operation: '',
                hospital_name_operation: '',
                is_hospitalized: false,
                hospital_name_confined: '',
                physician: '',
                diagnosis: '',
                temperature: '',
                blood_pressure: '',
                complaint: ''
            }
        },
        components: {
            AssessmentForm
        },
        methods: {
            addItem(array) {
                console.log('clk')
                let temp = [...this[array]]
                temp.push('')
                this[array] = temp
            },
            deleteItem(index, array) {
                let temp = [...this[array]]
                temp.splice(index, 1)
                this[array] = temp
            },
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
            submitConsultationForm() {
                axios.post('/api/consultation/store', {
                    temperature: this.temperature,
                    blood_pressure: this.blood_pressure,
                    patient_id: this.patient.id,
                    blood_type: this.patient.blood_type,
                    height: this.patient.height,
                    weight: this.patient.weight,
                    food_allergy: this.patient.food_allergy,
                    medicine_allergy: this.patient.medicine_allergy,
                    other_allergy: this.patient.other_allergy,
                    is_pregnant: this.is_pregnant,
                    is_disabled: this.is_disabled,
                    past_present_illness: this.past_present_illness,
                    illness: this.illness,
                    is_operated: this.is_operated,
                    date_of_operation: this.date_of_operation,
                    type_of_operation: this.type_of_operation,
                    hospital_name_operation: this.hospital_name_operation,
                    is_hospitalized: this.is_hospitalized,
                    hospital_name_confined: this.hospital_name_confined,
                    physician: this.physician,
                    diagnosis: this.diagnosis,
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