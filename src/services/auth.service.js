import axios from 'axios'
import authHeader from '../mixins/auth-header'
import decodeJwt from '../mixins/utils'

const API_URL = import.meta.env.VITE_BASE_URL
class AuthService {
  async login(user) {
    await axios
      .post(API_URL + '/auth/login', {
        phone: user.phone.replace(/([() -])/g, ''),
        password: user.password,
      })
      .then((res) => {
        sessionStorage.setItem('token', res?.data?.value)
        console.log(decodeJwt(res?.data?.value));
      })
    return sessionStorage.getItem('token')
  }
  async logout() {
    await axios
      .get(API_URL + '/auth/logout', { headers: authHeader() })
      .then(() => {
        sessionStorage.clear()
      })
    sessionStorage.clear()
    localStorage.clear()
  }
}

export default new AuthService()
