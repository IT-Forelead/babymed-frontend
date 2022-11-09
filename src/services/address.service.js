import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service.js'

class AddressService {
  async getAllRegions() {
    return AxiosService.get('/customer/regions', { headers: authHeader() })
  }
  async getAllCities(region_id) {
    return AxiosService.get(`/customer/towns/${region_id}`, { headers: authHeader() })
  }
}

export default new AddressService()
