<template>
    <div class="fixed w-full md:w-1/6 h-full left-0 p-5 bg-gray-900 text-sm z-10">
        <nav class="flex flex-col gap-5">
            <RouterLink activeClass="bg-violet-900" class="block rounded p-2 hover:bg-indigo-900" to="/"><v-icon name="fa-home" /> Home</RouterLink>
            <RouterLink activeClass="bg-violet-900" class="block rounded p-2 hover:bg-indigo-900" to="/patient"><v-icon name="fa-stethoscope" /> Patient</RouterLink>
            <p class="p-2 rounded block"><v-icon name="fa-briefcase-medical" /> Services</p>
            <ul class="p-2 space-y-4 border-t">
                <li>
                    <RouterLink activeClass="bg-violet-900" class="block rounded p-2 hover:bg-indigo-900" to="/consultation">
                        <v-icon name="fa-comment-medical"></v-icon>
                        Consultation
                    </RouterLink>
                </li>
                <li>
                    <RouterLink activeClass="bg-violet-900" class="block rounded p-2 hover:bg-indigo-900" to="/medical-examination">
                        <v-icon name="fa-notes-medical" />
                        Medical Examination
                    </RouterLink>
                </li>
                <li><RouterLink activeClass="bg-violet-900" class="block rounded p-2 hover:bg-indigo-900" to="/dental-consultation">
                    <v-icon name="fa-tooth" />
                    Dental Consultation
                </RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router';

    export default {
        computed: {
            isActiveLink(link) {
                return this.$route.path.startsWith(link)
            }
        },
    }
</script>