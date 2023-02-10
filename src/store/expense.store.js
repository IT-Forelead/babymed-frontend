import { defineStore } from 'pinia'

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: [],
    operations: [],
    operationServices: [],
    dailyOperationExpenses: [],
    selectedOperationService: {},
  }),
  actions: {
    setExpenses(data) {
      this.expenses.push(...data)
    },
    setOperationServices(data) {
      this.operationServices.push(...data)
    },
    setOperations(data) {
      this.operations.push(...data)
    },
    setOperationExpenses(data) {
      this.dailyOperationExpenses.push(...data)
    },
    setSelectedOperationService(data) {
      this.selectedOperationService = data
    },
    clearStore() {
      this.expenses = []
      this.operations = []
      this.operationServices = []
      this.dailyOperationExpenses = []
    },
  },
})
