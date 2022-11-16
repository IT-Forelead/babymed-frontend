import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class PatientService {
  async createPatient(data) {
    return AxiosService.post('/patient', data, { headers: authHeader() })
  }
  async getPatients(filter) {
    return AxiosService.post('/patient/report', filter, { headers: authHeader() })
  }
}

export default new PatientService()
