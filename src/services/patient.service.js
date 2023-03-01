import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class PatientService {
  async createPatient(data) {
    return AxiosService.post('/patient', data, { headers: authHeader() })
  }
  async getPatients(filter) {
    return AxiosService.post('/patient/report', filter, { headers: authHeader() })
  }
  async deletePatient(id) {
    return AxiosService.get(`/patient/delete/${id}`, { headers: authHeader() })
  }
  async getPatientsByFullname(data) {
    return AxiosService.get('/patient/search?full_name=' + data, { headers: authHeader() })
  }
}

export default new PatientService()
