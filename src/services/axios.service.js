import axios from 'axios'
import refreshToken from "../mixins/refresh.token";

const API_URL = import.meta.env.VITE_BASE_URL;

class AxiosService {

    async post(url, data, config) {
        const response = await axios.post(API_URL + url, data, config)
            .catch((err) => {
                if (err?.response?.status === 403) {
                    alert('Your token is expired!')
                    localStorage.clear()
                    window.location.reload()
                } else {
                    refreshToken(err?.response)
                    throw Error(err)
                }
            })
        refreshToken(response)
        return response.data
    }

    async put(url, data, config) {
        const response = await axios.put(API_URL + url, data, config)
        refreshToken(response)
        return response.data
    }

    async get(url, config) {
        const response = await axios.get(API_URL + url, config)
            .catch((err) => {
                if (err?.response?.status === 403) {
                    alert('Your token is expired!')
                    localStorage.clear()
                    window.location.reload()
                } else {
                    refreshToken(err?.response)
                    throw Error(err)
                }
            })
        refreshToken(response)
        return response.data
    }
}

export default new AxiosService()