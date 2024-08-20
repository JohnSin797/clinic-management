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
                        v-model="this.last_name"
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
                        v-model="this.first_name"
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
                        v-model="this.middle_name"
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
                        v-model="this.name_extension"
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
                        v-model="this.date_of_birth"
                        id="date_of_birth" 
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                    />
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/4">
                    <label for="employment_status" class="text-xs font-bold">Employment Status:</label>
                    <select v-model="this.employment_status" name="employment_status" id="employment_status" class="w-full rounded bg-gray-900 outline-none p-2" >
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
                        v-model="this.department"
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
                        v-model="this.id_number" 
                        :readonly="this.is_id_num_null"
                        class="w-full rounded bg-gray-900 outline-none p-2" 
                    />
                </div>
            </div>
            <div class="text-gray-200 mb-4">
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full">
                    <label for="address" class="text-xs font-bold">Address:</label>
                    <textarea name="address" id="address" rows="2" class="outline-none resize-none w-full rounded bg-gray-900 p-2" v-model="this.address"></textarea>
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
                        v-model="this.father_name"
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
                        v-model="this.father_occupation"
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
                        v-model="this.father_date_of_birth"
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
                        v-model="this.mother_name"
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
                        v-model="this.mother_occupation"
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
                        v-model="this.mother_date_of_birth"
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
                        <input type="radio" name="option_father" id="option_father" class="mr-5" value="father" v-model="this.emergency_option_1">
                        <label for="option_mother" class="text-gray-400">Mother</label>
                        <input type="radio" name="option_mother" id="option_mother" value="mother" v-model="this.emergency_option_1">
                    </div>
                </div>
                <div class="group rounded p-3 ring-2 ring-gray-400 focus-within:ring-indigo-600 w-full md:w-1/2">
                    <label for="emergency_contact_1" class="text-xs font-bold">Contact number:</label>
                    <input 
                        type="text" 
                        name="emergency_contact_1" 
                        id="emergency_contact_1" 
                        class="w-full rounded outline-none p-2 bg-gray-900" 
                        v-model="this.emergency_contact_1"
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
                        v-model="this.emergency_option_2"
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
                        v-model="this.emergency_contact_2"
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
                        v-model="this.option_2_relation"
                        placeholder="Relation"
                    />
                </div>
            </div>
            <button @click="createPatient" class="w-full md:w-1/2 p-3 rounded bg-indigo-600 hover:bg-indigo-500">Create</button>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
import Swal from 'sweetalert2';
    export default {
        data() {
            return {
                first_name: '',
                last_name: '',
                middle_name: '',
                name_extension: '',
                date_of_birth: '',
                gender: '',
                nationality: '',
                religion: '',
                address: '',
                contact: '',
                email: '',
                employment_status: 'student',
                department: '',
                id_number: '',
                father_name: '',
                father_date_of_birth: '',
                father_occupation: '',
                mother_name: '',
                mother_date_of_birth: '',
                mother_occupation: '',
                emergency_to_be_notified_1: '',
                emergency_option_1: 'father',
                emergency_contact_1: '',
                emergency_option_2: '',
                emergency_contact_2: '',
                option_2_relation: '',
                is_id_num_null: false
            }
        },
        created() {
            this.setIdNumber()
        },
        watch: {
            '$route.params.id_number': function(newId) {
                this.id_number = newId
                this.is_id_num_null = newId != null ? true : false
            }
        },
        methods: {
            setIdNumber() {
                const r = this.$route.params.id_number
                this.id_number = this.$route.params.id_number
                this.is_id_num_null = (r == null || r == '' ? false : true)
            },
            createPatient() {
                axios.post('/api/patient/store', {
                    id_number: this.id_number,
                    first_name: this.first_name,
                    middle_name: this.middle_name,
                    last_name: this.last_name,
                    extension: this.name_extension,
                    date_of_birth: this.date_of_birth,
                    employment_status: this.employment_status,
                    department: this.department,
                    address: this.address,
                    father_name: this.father_name,
                    father_occupation: this.father_occupation,
                    father_date_of_birth: this.father_date_of_birth,
                    mother_name: this.mother_name,
                    mother_occupation: this.mother_occupation,
                    mother_date_of_birth: this.mother_date_of_birth,
                    person_to_contact_name: this.emergency_option_1,
                    person_to_contact_number: this.emergency_contact_1,
                    other_person_to_contact_name: this.emergency_option_2,
                    other_person_to_contact_number: this.emergency_contact_2,
                    relation_to_other_person: this.option_2_relation
                })
                .then(response => {
                    Swal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success',
                        showConfirmButton: true,
                    })
                    this.$router.push('/patient')
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>