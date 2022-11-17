import { defineStore } from 'pinia'

export const useVisitStore = defineStore('visit', {
  state: () => ({
    patients: [],
  }),
  actions: {
    setPatients(data) {
      this.patients.push(...data)
    },
    clearStore() {
      this.patients = []
    },
  },
})
