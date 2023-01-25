import { defineStore } from 'pinia'

export const useCheckupExpenseStore = defineStore('checkupExpense', {
  state: () => ({
    checkupExpenses: [],
    doctorShares: [],
    selectedDoctorShare: {},
  }),
  actions: {
    setCheckupExpenses(data) {
      this.checkupExpenses.push(...data)
    },
    setDoctorShares(data) {
      this.doctorShares.push(...data)
    },
    setSelectedDoctorShare(data) {
      this.selectedDoctorShare = data
    },
    clearStore() {
      this.checkupExpenses = []
      this.doctorShares = []
    },
  },
})
