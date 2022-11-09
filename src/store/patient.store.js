import { defineStore } from 'pinia'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
  }),
  actions: {
    setPatients(data) {
      this.patients = data
    },
  },
})
