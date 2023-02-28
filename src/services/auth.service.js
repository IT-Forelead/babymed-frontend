import axios from 'axios'
import authHeader from '../mixins/auth-header'

const API_URL = import.meta.env.VITE_BASE_URL
class AuthService {
  async login(user) {
    await axios
      .post(API_URL + '/auth/login', {
        phone: user.phone.replace(/([() -])/g, ''),
        password: user.password,
      })
      .then((res) => {
        localStorage.setItem('token', res?.data?.value)
      })
    return localStorage.getItem('token')
  }
  async resetPassword(phone) {
    let parsedPhone = phone.replace(/([() -])/g, '')
    await axios.get(`${API_URL}/auth/reset-password?phone=${encodeURIComponent(parsedPhone)}`)
  }
  async linkValidationAndUpdatePassword(data) {
    await axios.post(API_URL + '/auth/link-validation-and-update-password', data)
  }
  async linkValidation(linkCode) {
    await axios.get(`${API_URL}/auth/link-validation/${linkCode}`)
  }
  async logout() {
    await axios.get(API_URL + '/auth/logout', { headers: authHeader() }).then(() => {
      localStorage.clear()
    })
    localStorage.clear()
  }
}

export default new AuthService()
