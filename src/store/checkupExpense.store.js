import { defineStore } from 'pinia'

export const useCheckupExpenseStore = defineStore('checkupExpense', {
  state: () => ({
    checkupExpenses: [],
  }),
  actions: {
    setCheckupExpenses(data) {
      this.checkupExpenses.push(...data)
    },
    clearStore() {
      this.checkupExpenses = []
    },
  },
})
