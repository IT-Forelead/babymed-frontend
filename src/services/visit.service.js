import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class VisitService {
  async createVisit(data) {
    return AxiosService.post('/visit/create', data, { headers: authHeader() })
  }
  async getVisits(filter) {
    return AxiosService.post('/visit/report', filter, { headers: authHeader() })
  }
  async getAllVisits(filter) {
    return AxiosService.post('/visit/report?page=1&limit=1000', filter, { headers: authHeader() })
  }
  async changePaymentStatus(id) {
    return AxiosService.get(`/visit/update-payment-status/${id}`, { headers: authHeader() })
  }
  async getDailyProfit(data) {
    return AxiosService.post('/visit/daily-profit', data, { headers: authHeader() })
  }
  async getNumberOfDailyVisits() {
    return AxiosService.get('/visit/daily-visits', { headers: authHeader() })
  }
}

export default new VisitService()
