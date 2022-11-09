import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class PaymentService {
  async createPayment(data) {
    return AxiosService.post('/payment', data, { headers: authHeader() })
  }
}

export default new PaymentService()
