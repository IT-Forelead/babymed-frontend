import { defineStore } from 'pinia'

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: [],
  }),
  actions: {
    setExpenses(data) {
      this.expenses.push(...data)
    },
    clearStore() {
      this.expenses = []
    },
  },
})
