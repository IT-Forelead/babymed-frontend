import { defineStore } from 'pinia'

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: [],
    operations: [],
    operationServices: [],
    dailyOperationExpenses: [],
    numberOfDailyOperations: [],
    numberOfMonthlyOperations: [],
    operationExpenseItemsSummary: [],
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
    setDailyOperationExpenses(data) {
      this.dailyOperationExpenses.push(...data)
    },
    setNumberOfDailyOperations(data) {
      this.numberOfDailyOperations.push(...data)
    },
    setOperationExpenseItemsSummary(data) {
      this.operationExpenseItemsSummary.push(...data)
    },
    setNumberOfMonthlyOperations(data) {
      this.numberOfMonthlyOperations.push(...data)
    },
    setSelectedOperationService(data) {
      this.selectedOperationService = data
    },
    clearStore() {
      this.expenses = []
      this.operations = []
      this.operationServices = []
      this.dailyOperationExpenses = []
      this.numberOfDailyOperations = []
      this.operationExpenseItemsSummary = []
      this.numberOfMonthlyOperations = []
    },
  },
})
