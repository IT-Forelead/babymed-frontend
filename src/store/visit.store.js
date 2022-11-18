import { defineStore } from 'pinia'

export const useVisitStore = defineStore('visit', {
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
