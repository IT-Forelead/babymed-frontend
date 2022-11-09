import axios from 'axios'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
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
        sessionStorage.setItem('token', res?.data?.value)
      })
      .catch((err) => {
        console.log(err?.message)
        notify.warning({
          message: 'Phone Number or Password incorrect. Please try again!',
        })
      })
    return sessionStorage.getItem('token')
  }
  async logout() {
    await axios
      .get(API_URL + '/auth/logout', { headers: authHeader() })
      .then((res) => {
        sessionStorage.clear()
        localStorage.clear()
      })
      .catch((err) => {
        notify.warning({
          message: 'Error while logging out!',
        })
      })
    sessionStorage.clear()
    localStorage.clear()
  }
}

export default new AuthService()
