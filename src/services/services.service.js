import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service.js'

class ServicesService {
  async getServicesByTypeId(data) {
    return AxiosService.get('/service/services?type_id=' + data, { headers: authHeader() })
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
  async createServiceType(data) {
    return AxiosService.post('/service/create/service-type', `"${data}"`, { headers: authHeader() })
  }
  async getAllServiceTypes() {
    return AxiosService.get('/service/service-types', { headers: authHeader() })
  }
  async getAllServices() {
    return AxiosService.get('/service/services', { headers: authHeader() })
  }
  async deleteServiceType(service_type_id) {
    return AxiosService.get(`/service/delete-service-type/${service_type_id}`, { headers: authHeader() })
  }
}

export default new ServicesService()
