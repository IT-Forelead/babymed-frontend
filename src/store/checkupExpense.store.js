import { defineStore } from 'pinia'

export const useCheckupExpenseStore = defineStore('checkupExpense', {
  state: () => ({
    checkupExpenses: [],
    dailyCheckupExpenses: [],
    checkupExpensesSummary: [],
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
    setCheckupExpensesSummary(data) {
      this.checkupExpensesSummary.push(...data)
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
      this.checkupExpensesSummary = []
      this.dailyCheckupExpenses = []
      this.doctorShares = []
    },
  },
})
