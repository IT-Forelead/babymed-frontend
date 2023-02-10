import { defineStore } from 'pinia'

export const useVisitStore = defineStore('visit', {
  state: () => ({
    patients: [],
    dailyProfit: [],
    selectedPatient: {},
  }),
  actions: {
    setPatients(data) {
      this.patients.push(...data)
    },
    setDailyProfit(data) {
      this.dailyProfit.push(...data)
    },
    setSelectedPatient(data) {
      this.selectedPatient = data
    },
    clearStore() {
      this.patients = []
      this.dailyProfit = []
    },
  },
})
