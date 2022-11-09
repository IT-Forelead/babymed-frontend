import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class PatientService {
  async createPatient(data) {
    return AxiosService.post('/customer', data, { headers: authHeader() })
  }
  async getPatients(filter) {
    return AxiosService.post('/customer/report', filter, { headers: authHeader() })
  }
}

export default new PatientService()
