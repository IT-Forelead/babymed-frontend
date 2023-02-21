import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class ExpenseService {
  async createExpense(data) {
    return AxiosService.post('/operation-expense/create', data, { headers: authHeader() })
  }
  async createOperationService(data) {
    return AxiosService.post('/operation-expense/create/operation-service', `"${data}"`, { headers: authHeader() })
  }
  async getAllExpenses(data) {
    return AxiosService.post('/operation-expense/report', data, { headers: authHeader() })
  }
  async getDailyOperationExpenses(data) {
    return AxiosService.post('/operation-expense/daily-expenses', data, { headers: authHeader() })
  }
  async getOperationExpenseItemsSummary(data) {
    return AxiosService.post('/operation-expense/daily-doctor-shares', data, { headers: authHeader() })
  }
  async getOperations(data) {
    return AxiosService.post('/operation-expense/operations', data, { headers: authHeader() })
  }
  async getAllOperationServices() {
    return AxiosService.get('/operation-expense/operation-services', { headers: authHeader() })
  }
  async getExpenseItemsByExpenseId(ex_id) {
    return AxiosService.get('/operation-expense/items/' + ex_id, { headers: authHeader() })
  }
  async deleteOperationService(id) {
    return AxiosService.get(`/operation-expense/delete/operation-service/${id}`, { headers: authHeader() })
  }
  async getNumberOfDailyOperations() {
    return AxiosService.get('/operation-expense/daily-operations', { headers: authHeader() })
  }
  async getNumberOfMonthlyOperations() {
    return AxiosService.get('/operation-expense/monthly-operations', { headers: authHeader() })
  }
}

export default new ExpenseService()
