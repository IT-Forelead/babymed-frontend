import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class UserService {
  async createUser(data) {
    return AxiosService.post('/user', data, { headers: authHeader() })
  }
  async getUsers(filter) {
    return AxiosService.post('/user/report', filter, { headers: authHeader() })
  }
  async getSubRoles() {
    return AxiosService.get('/role/sub-roles', { headers: authHeader() })
  }
  async getAllDoctors(data) {
    return AxiosService.post('/user/report?page=1&limit=1000', data, { headers: authHeader() })
  }
  async deleteUser(id) {
    return AxiosService.get(`/user/delete/${id}`, { headers: authHeader() })
  }
}

export default new UserService()
