<template>
    <div class="flex flex-col justify-center items-center w-full min-h-screen">
        <AssessmentForm title="Assessment" :inputList="this.input_list" :onSubmit="this.submitConsultationForm" />
    </div>
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
                        input_placeholder: ''
                    },
                ],
            }
        },
        components: {
            AssessmentForm
        },
        methods: {
            submitConsultationForm(formData) {
                axios.post('/consultation/store', formData)
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
                })
            }
        }
    }
</script>