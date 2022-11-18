import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class UserService {
  async createUser(data) {
    return AxiosService.post('/user', data, { headers: authHeader() })
  }
  async getUsers(filter) {
    return AxiosService.post('/user/report', filter, { headers: authHeader() })
  }
  async getAllDoctors(data) {
    return AxiosService.post('/user/report', data, { headers: authHeader() })
  }
}

export default new UserService()
