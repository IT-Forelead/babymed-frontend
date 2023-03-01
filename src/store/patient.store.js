import { defineStore } from 'pinia'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
    selectedPatient: {},
  }),
  actions: {
    setPatients(data) {
      this.patients.push(...data)
    },
    setSelectedPatient(data) {
      this.selectedPatient = data
    },
    clearStore() {
      this.patients = []
    },
  },
})
