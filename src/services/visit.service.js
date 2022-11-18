import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class VisitService {
  async createVisit(data) {
    return AxiosService.post('/visit/create', data, { headers: authHeader() })
  }
  async getVisits(filter) {
    return AxiosService.post('/visit/report', filter, { headers: authHeader() })
  }
  async changePaymentStatus(id) {
    return AxiosService.get(`/visit/update-payment-status/${id}`, { headers: authHeader() })
  }
}

export default new VisitService()
