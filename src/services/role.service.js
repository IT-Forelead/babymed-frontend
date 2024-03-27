import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class RoleService {
  async createRole(data) {
    return AxiosService.post('/role', data, { headers: authHeader() })
  }
  async getRoles() {
    return AxiosService.get('/role/all-roles', { headers: authHeader() })
  }
  async getDefaultRoles() {
    return AxiosService.get('/role/default-roles', { headers: authHeader() })
  }
}

export default new RoleService()
