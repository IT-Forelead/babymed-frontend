import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class CheckupExpenseService {
  async createDoctorShare(data) {
    return AxiosService.post('/checkup-expense/create/doctor-share', data, { headers: authHeader() })
  }
  async getCheckupExpenses(data) {
    return AxiosService.post('/checkup-expense/report?page=1&limit=10', data, { headers: authHeader() })
  }
  async getAllDocotrShare() {
    return AxiosService.get('/checkup-expense/doctor-shares', { headers: authHeader() })
  }
  async deleteDoctorShare(doctorShareId) {
    return AxiosService.get(`/checkup-expense/delete-doctor-share/${doctorShareId}`, { headers: authHeader() })
  }
}

export default new CheckupExpenseService()
