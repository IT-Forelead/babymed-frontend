import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service.js'

class ServicesService {
  async getAllServices() {
    return AxiosService.get('/service/report', { headers: authHeader() })
  }
  async createService(data) {
    return AxiosService.post('/service/create', data, { headers: authHeader() })
  }
  async editService(data) {
    return AxiosService.post('/service/edit', data, { headers: authHeader() })
  }
  async deleteService(service_id) {
    return AxiosService.get(`/service/delete/${service_id}`, { headers: authHeader() })
  }
}

export default new ServicesService()
