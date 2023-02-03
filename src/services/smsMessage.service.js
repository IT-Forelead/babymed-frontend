import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class SmsMessageService {
  async getSmsMessages(filter) {
    return AxiosService.post('/message/report', filter, { headers: authHeader() })
  }
}

export default new SmsMessageService()
