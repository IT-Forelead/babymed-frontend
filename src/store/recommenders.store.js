import { defineStore } from 'pinia'

export const useRecommendersStore = defineStore('recommenders', {
  state: () => ({
    recommenders: [],
    selectedRecommender: {},
    recommendersShares: [],
  }),
  actions: {
    setRecommenders(data) {
      this.recommenders = data
    },

    setSelectedRecommender(data) {
      this.selectedRecommender = data
    },

    setRecommendersShares(data) {
      this.recommendersShares = data
    },

    clearStore() {
      this.recommenders = [];
    },
  },
})
