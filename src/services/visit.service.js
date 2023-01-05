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
  async getAllVisitsForExpense() {
    return AxiosService.get('/visit/report/712852a6-830f-45bd-9797-43c5c50ba1df', { headers: authHeader() })
  }
  async changePaymentStatus(id) {
    return AxiosService.get(`/visit/update-payment-status/${id}`, { headers: authHeader() })
  }
}

export default new VisitService()
