import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class ExpenseService {
  async createExpense(data) {
    return AxiosService.post('/operation-expense/create', data, { headers: authHeader() })
  }
  async getAllExpenses(data) {
    return AxiosService.post('/operation-expense/report?page=1&limit=10', data, { headers: authHeader() })
  }
  async getOperations(data) {
    return AxiosService.post('/operation-expense/operations?page=1&limit=10', data, { headers: authHeader() })
  }
  async getAllOperationServices() {
    return AxiosService.get('/operation-expense/operation-services', { headers: authHeader() })
  }
  async getExpenseItemsByExpenseId(ex_id) {
    return AxiosService.get('/operation-expense/items/' + ex_id, { headers: authHeader() })
  }
}

export default new ExpenseService()
