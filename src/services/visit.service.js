import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class VisitService {
  async createVisit(data) {
    return AxiosService.post('/visit/create', data, { headers: authHeader() })
  }
  async getVisits(filter) {
    return AxiosService.post('/visit/report', filter, { headers: authHeader() })
  }
}

export default new VisitService()
