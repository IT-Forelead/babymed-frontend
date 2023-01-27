import { defineStore } from 'pinia'

export const useCheckupExpenseStore = defineStore('checkupExpense', {
  state: () => ({
    checkupExpenses: [],
    dailyCheckupExpenses: [],
    doctorShares: [],
    selectedDoctorShare: {},
  }),
  actions: {
    setCheckupExpenses(data) {
      this.checkupExpenses.push(...data)
    },
    setDailyCheckupExpenses(data) {
      this.dailyCheckupExpenses.push(...data)
    },
    setDoctorShares(data) {
      this.doctorShares.push(...data)
    },
    setSelectedDoctorShare(data) {
      this.selectedDoctorShare = data
    },
    clearStore() {
      this.checkupExpenses = []
      this.dailyCheckupExpenses = []
      this.doctorShares = []
    },
  },
})
