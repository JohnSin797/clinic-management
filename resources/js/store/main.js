import { defineStore } from "pinia";

export const useMainStore = defineStore('main', {
    state: () => ({
        patientData: null,
    }),
    getters: {
        patient: (state) => state.patientData,
    },
    actions: {
        getPatient(patient) {
            this.patientData = patient
        }
    },
    persist: true
});