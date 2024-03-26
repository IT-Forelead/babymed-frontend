import { defineStore } from 'pinia'

export const useRecommendersStore = defineStore('recommenders', {
  state: () => ({
    recommenders: [],
    selectedRecommender: {},
  }),
  actions: {
    setRecommenders(data) {
      this.recommenders = data
    },

    setSelectedRecommender(data) {
      this.selectedRecommender = data
    },

    clearStore() {
      this.recommenders = [];
    },
  },
})
