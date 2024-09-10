<template>
    <div class="flex items-center w-full min-h-screen flex-col">
        <section class="w-96 md:w-4/5 p-10 rounded-lg shadow-xl bg-gray-900 mt-20">
            <h1 class="text-2xl text-gray-400 mb-5">Patient Information</h1>
            <div class="flex flex-col md:flex-row gap-4 text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="last_name" class="text-xs font-bold">Last name:</label>
                    <input 
                        type="text" 
                        name="last_name" 
                        id="last_name" 
                        v-model="this.patient.last_name"
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        placeholder="Last name"
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="first_name" class="text-xs font-bold w-full">First name:</label>
                    <input 
                        type="text" 
                        name="first_name" 
                        id="first_name" 
                        v-model="this.patient.first_name"
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        placeholder="First name"
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="middle_name" class="text-xs font-bold">Middle name:</label>
                    <input 
                        type="text" 
                        name="middle_name" 
                        id="middle_name" 
                        v-model="this.patient.middle_name"
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        placeholder="Middle name"
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/5">
                    <label for="name_extension" class="text-xs font-bold">Extension:</label>
                    <input 
                        type="text" 
                        name="name_extension" 
                        id="name_extension" 
                        v-model="this.patient.name_extension"
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        placeholder="Ext."
                    />
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4 text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/4">
                    <label for="date_of_birth" class="text-xs font-bold">Date of birth:</label>
                    <input 
                        type="date" 
                        name="date_of_birth" 
                        v-model="this.patient.date_of_birth"
                        id="date_of_birth" 
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/4">
                    <label for="employment_status" class="text-xs font-bold">Employment Status:</label>
                    <select v-model="this.patient.employment_status" name="employment_status" id="employment_status" class="w-full rounded bg-gray-900 outline-none p-2" >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="non-teaching staff">Non-Teaching Staff</option>
                    </select>
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="department" class="text-xs font-bold">Department:</label>
                    <input 
                        type="text" 
                        name="department" 
                        v-model="this.patient.department"
                        id="department" 
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        placeholder="Department"
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="id_number" class="text-xs font-bold">ID number:</label>
                    <input 
                        type="text" 
                        name="id_number" 
                        id="id_number" 
                        v-model="this.patient.id_number"
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                    />
                </div>
            </div>
            <div class="text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full">
                    <label for="address" class="text-xs font-bold">Address:</label>
                    <textarea name="address" id="address" rows="2" class="outline-none resize-none w-full rounded bg-gray-900 p-2" v-model="this.patient.address"></textarea>
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4 text-gray-400 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="blood_type" class="text-xs font-bold">Blood type:</label>
                    <input 
                        type="text" 
                        name="blood_type" 
                        id="blood_type" 
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        v-model="this.patient.blood_type"
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="height" class="text-xs font-bold">Height:</label>
                    <input 
                        type="text" 
                        name="height" 
                        id="height" 
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        v-model="this.patient.height"
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="weight" class="text-xs font-bold">Weight:</label>
                    <input 
                        type="text" 
                        name="weight" 
                        id="weight" 
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                        v-model="this.patient.weight"
                    />
                </div>
            </div>
        </section>
        <section class="w-96 md:w-4/5 p-10 rounded-lg shadow-xl bg-gray-900 my-10">
            <h1 class="text-2xl text-gray-400 mb-5">Medical Condition</h1>
            <div class="flex flex-col gap-4 text-gray-200 mb-4 md:px-16">
                <div class="group rounded p-3 w-full">
                    <label class="text-xs font-bold">Food allergy:</label>
                    <div v-for="(food, idx) in this.patient.food_allergy" class="flex justify-center items-center gap-4 mb-2">
                        <input 
                            type="text" 
                            name="food_allergy" 
                            id="food_allergy" 
                            class="w-full rounded bg-gray-900 outline-none p-2 ring-2 ring-gray-400 focus:ring-indigo-600" 
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
                    <label class="text-xs font-bold">Medicine allergy:</label>
                    <div v-for="(medicine, idx) in this.patient.medicine_allergy" class="flex justify-center items-center gap-4 mb-2">
                        <input 
                            type="text" 
                            name="medicine_allergy" 
                            id="medicine_allergy" 
                            class="w-full rounded bg-gray-900 outline-none p-2 ring-2 ring-gray-400 focus:ring-indigo-600" 
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
                    <label class="text-xs font-bold">Other allergy:</label>
                    <div v-for="(other, idx) in this.patient.other_allergy" class="flex justify-center items-center gap-4 mb-2">
                        <input 
                            type="text" 
                            name="other_allergy" 
                            id="other_allergy" 
                            class="w-full rounded bg-gray-900 outline-none p-2 ring-2 ring-gray-400 focus:ring-indigo-600" 
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
        <section class="w-96 md:w-4/5 p-10 rounded-lg shadow-xl bg-gray-900 my-10">
            <h1 class="text-2xl text-gray-400 mb-5">Parent's Information</h1>
            <div class="flex flex-col md:flex-row gap-4 text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="father_name" class="text-xs font-bold">Father's name:</label>
                    <input 
                        type="text" 
                        name="father_name" 
                        id="father_name" 
                        class="w-full rounded bg-gray-900 outline-none p-2"
                        v-model="this.patient.father_name"
                        placeholder="Father's name" 
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/4">
                    <label for="father_occupation" class="text-xs font-bold">Occupation:</label>
                    <input 
                        type="text" 
                        name="father_occupation" 
                        id="father_occupation" 
                        class="w-full rounded bg-gray-900 outline-none p-2"
                        v-model="this.patient.father_occupation"
                        placeholder="Father's occupation" 
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/4">
                    <label for="father_date_of_birth" class="text-xs font-bold">Date of birth:</label>
                    <input 
                        type="date" 
                        name="father_date_of_birth" 
                        id="father_date_of_birth" 
                        class="w-full rounded bg-gray-900 outline-none p-2"
                        v-model="this.patient.father_date_of_birth"
                    />
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4 text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="mother_name" class="text-xs font-bold">Mother's name:</label>
                    <input 
                        type="text" 
                        name="mother_name" 
                        id="mother_name" 
                        class="w-full rounded bg-gray-900 outline-none p-2"
                        v-model="this.patient.mother_name"
                        placeholder="Mother's name" 
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/4">
                    <label for="mother_occupation" class="text-xs font-bold">Occupation:</label>
                    <input 
                        type="text" 
                        name="mother_occupation" 
                        id="mother_occupation" 
                        class="w-full rounded bg-gray-900 outline-none p-2"
                        v-model="this.patient.mother_occupation"
                        placeholder="Mother's occupation" 
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/4">
                    <label for="mother_date_of_birth" class="text-xs font-bold">Date of birth:</label>
                    <input 
                        type="date" 
                        name="mother_date_of_birth" 
                        id="mother_date_of_birth" 
                        class="w-full rounded bg-gray-900 outline-none p-2"
                        v-model="this.patient.mother_date_of_birth"
                    />
                </div>
            </div>
        </section>
        <section class="w-96 md:w-4/5 p-10 rounded-lg shadow-xl bg-gray-900 mb-10">
            <h1 class="text-2xl text-gray-400 mb-5">In case of emergency</h1>
            <div class="flex flex-col md:flex-row gap-4 text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="" class="text-xs font-bold">Person to contact</label>
                    <div class="flex items-center justify-start gap-4 p-3">
                        <label for="option_father" class="text-gray-400">Father</label>
                        <input type="radio" name="option_father" id="option_father" class="mr-5" value="father" v-model="this.patient.person_to_contact_name">
                        <label for="option_mother" class="text-gray-400">Mother</label>
                        <input type="radio" name="option_mother" id="option_mother" value="mother" v-model="this.patient.person_to_contact_name">
                    </div>
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="emergency_contact_1" class="text-xs font-bold">Contact number:</label>
                    <input 
                        type="text" 
                        name="emergency_contact_1" 
                        id="emergency_contact_1" 
                        class="w-full rounded outline-none p-2 bg-gray-900" 
                        v-model="this.patient.person_to_contact_number"
                        placeholder="Contact number"
                    />
                </div>
            </div>
            <p class="text-gray-400 mb-4">(In case parents can not be reached)</p>
            <div class="flex flex-col md:flex-row gap-4 text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="emergency_to_be_notified" class="text-xs font-bold">Name:</label>
                    <input 
                        type="text" 
                        name="emergency_to_be_notified" 
                        id="emergency_to_be_notified" 
                        class="w-full rounded outline-none p-2 bg-gray-900" 
                        v-model="this.patient.other_person_to_contact_name"
                        placeholder="Name"
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="emergency_contact_2" class="text-xs font-bold">Contact number:</label>
                    <input 
                        type="text" 
                        name="emergency_contact_2" 
                        id="emergency_contact_2" 
                        class="w-full rounded outline-none p-2 bg-gray-900" 
                        v-model="this.patient.other_person_to_contact_number"
                        placeholder="Contact number"
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/3">
                    <label for="relation" class="text-xs font-bold">Relation:</label>
                    <input 
                        type="text" 
                        name="relation" 
                        id="relation" 
                        class="w-full rounded outline-none p-2 bg-gray-900" 
                        v-model="this.patient.relation_to_other_person"
                        placeholder="Relation"
                    />
                </div>
            </div>
            <button @click="updatePatient" class="w-full md:w-1/2 p-3 rounded bg-indigo-600 hover:bg-indigo-500">Update</button>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
import Swal from 'sweetalert2';
    export default {
        data() {
            return {
                patient: {
                    id: '',
                    id_number: '',
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    extension: '',
                    date_of_birth: '',
                    employment_status: '',
                    department: '',
                    address: '',
                    father_name: '',
                    father_occupation: '',
                    father_date_of_birth: '',
                    mother_name: '',
                    mother_occupation: '',
                    mother_date_of_birth: '',
                    person_to_contact_name: '',
                    person_to_contact_number: '',
                    other_person_to_contact_name: '',
                    other_person_to_contact_number: '',
                    relation_to_other_person: '',
                    blood_type: '',
                    height: '',
                    weight: '',
                    food_allergy: [''],
                    medicine_allergy: [''],
                    other_allergy: [''],
                }
            }
        },
        methods: {
            addItem(array) {
                let temp = [...this.patient[array]]
                temp.push('')
                this.patient[array] = temp
            },
            deleteItem(index, array) {
                let temp = [...this.patient[array]]
                temp.splice(index, 1)
                this.patient[array] = temp
            },
            updatePatient() {
                axios.put('/api/patient/update/' + this.patient.id, this.patient)
                .then(response => {
                    console.log(response)
                    Swal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success',
                        showConfirmButton: true,
                    })
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Error',
                        text: error.response?.data?.message,
                        icon: 'error',
                    })
                    console.log(error)
                })
            },
            getPatient() {
                const id = this.$route.params?.id_number
                axios.post('/api/patient/retrieve', {
                    id_number: id,
                })
                .then(response => {
                    this.patient = response.data?.patient
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