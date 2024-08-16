<template>
    <div class="fixed w-full md:w-1/6 h-full left-0 p-5 pt-20 md:pt-5 bg-gray-900 text-sm z-10">
        <nav class="flex flex-col gap-5">
            <h1 class="font-bold mb-3">Clinic Management</h1>
            <RouterLink :class="{'bg-indigo-900 text-cyan-400' : this.isActiveLink('/')}" class="block rounded p-2 hover:bg-indigo-900" to="/"><v-icon name="fa-home" /> Home</RouterLink>
            <RouterLink :class="{'bg-indigo-900 text-cyan-400' : this.isActiveLink('/patient')}" class="block rounded p-2 hover:bg-indigo-900" to="/patient"><v-icon name="fa-stethoscope" /> Patient</RouterLink>
            <div>
                <p class="p-2 rounded block"><v-icon name="fa-briefcase-medical" /> Services</p>
                <ul class="p-2 space-y-4 border-t">
                    <li>
                        <RouterLink :class="{'bg-indigo-900 text-cyan-400' : this.isActiveLink('/consultation')}" class="block rounded p-2 hover:bg-indigo-900" to="/consultation">
                            <v-icon name="fa-comment-medical"></v-icon>
                            Consultation
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :class="{'bg-indigo-900 text-cyan-400' : this.isActiveLink('/medical-examination')}" class="block rounded p-2 hover:bg-indigo-900" to="/medical-examination">
                            <v-icon name="fa-notes-medical" />
                            Medical Examination
                        </RouterLink>
                    </li>
                    <li><RouterLink :class="{'bg-indigo-900 text-cyan-400' : this.isActiveLink('/dental-consultation')}" class="block rounded p-2 hover:bg-indigo-900" to="/dental-consultation">
                        <v-icon name="fa-tooth" />
                        Dental Consultation
                    </RouterLink>
                    </li>
                </ul>
            </div>
            <div>
                <p class="p-2 rounded block"><v-icon name="fa-regular-folder-open" />Reports</p>
                <ul class="p-2 space-y-4 border-t">
                    <li>
                        <RouterLink :class="{'bg-indigo-900 text-cyan-400' : this.isActiveLink('/medicine')}" class="block rounded p-2 hover:bg-indigo-900" to="/medicine">
                            <v-icon name="fa-hand-holding-medical" />
                            Medicine Dispensed
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router';

    export default {
        methods: {
            isActiveLink(link) {
                if (link == '/') {
                    return this.$route.path === link
                }
                return this.$route.path.startsWith(link)
            }
        },
    }
</script>