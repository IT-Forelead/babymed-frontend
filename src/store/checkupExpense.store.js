import { defineStore } from 'pinia'

export const useCheckupExpenseStore = defineStore('checkupExpense', {
  state: () => ({
    checkupExpenses: [],
    doctorShares: [],
  }),
  actions: {
    setCheckupExpenses(data) {
      this.checkupExpenses.push(...data)
    },
    setDoctorShares(data) {
      this.doctorShares.push(...data)
    },
    clearStore() {
      this.checkupExpenses = []
      this.doctorShares = []
    },
  },
})
