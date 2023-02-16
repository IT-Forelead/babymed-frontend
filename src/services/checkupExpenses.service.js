import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class CheckupExpenseService {
  async createDoctorShare(data) {
    return AxiosService.post('/checkup-expense/create/doctor-share', data, { headers: authHeader() })
  }
  async getCheckupExpenses(data) {
    return AxiosService.post('/checkup-expense/report', data, { headers: authHeader() })
  }
  async getCheckupExpensesSummary(data) {
    return AxiosService.post('/checkup-expense/summary', data, { headers: authHeader() })
  }
  async getDailyCheckupExpenses(data) {
    return AxiosService.post('/checkup-expense/daily-expenses', data, { headers: authHeader() })
  }
  async getAllDocotrShares() {
    return AxiosService.get('/checkup-expense/doctor-shares', { headers: authHeader() })
  }
  async deleteDoctorShare(doctorShareId) {
    return AxiosService.get(`/checkup-expense/delete-doctor-share/${doctorShareId}`, { headers: authHeader() })
  }
}

export default new CheckupExpenseService()
