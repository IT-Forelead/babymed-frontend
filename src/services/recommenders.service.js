import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class RecommenderService {
  async getAllRecommenders(data) {
    return AxiosService.post('/recommender/report', data ?? {}, { headers: authHeader() })
  }

  async createRecommender(data) {
    return AxiosService.post('/recommender/create', data, { headers: authHeader() })
  }

  async deleteRecommender(id) {
    return AxiosService.get('/recommender/delete/' + id, { headers: authHeader() })
  }

  async updateRecommender(data) {
    return AxiosService.post('/recommender/update', data, { headers: authHeader() })
  }
}

export default new RecommenderService()
