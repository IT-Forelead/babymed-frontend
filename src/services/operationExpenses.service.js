import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class ExpenseService {
  async createExpense(data) {
    return AxiosService.post('/operation-expense/create', data, { headers: authHeader() })
  }
  async getAllExpenses(data) {
    return AxiosService.post('/operation-expense/report?page=1&limit=10', data, { headers: authHeader() })
  }
  async getExpenseItemsByExpenseId(ex_id) {
    return AxiosService.get('/operation-expense/items/' + ex_id, { headers: authHeader() })
  }
}

export default new ExpenseService()
