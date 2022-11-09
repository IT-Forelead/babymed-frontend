import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class PaymentService {
  async createPayment(data) {
    return AxiosService.post('/payment', data, { headers: authHeader() })
  }
  async deletePayment(p_id) {
    return AxiosService.get(`/payment/delete/${p_id}`, { headers: authHeader() })
  }
  async getPayments(filter) {
    return AxiosService.post('/payment/report', filter, { headers: authHeader() })
  }
}

export default new PaymentService()
