import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class RoleService {
  async createRole(data) {
    return AxiosService.post('/role', data, { headers: authHeader() })
  }
  async getRoles(filter) {
    return AxiosService.get('/role/all-roles', filter, { headers: authHeader() })
  }
  async getDefaultRoles(filter) {
    return AxiosService.get('/role/default-roles', filter, { headers: authHeader() })
  }
}

export default new RoleService()
