import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [],
    allServices: [],
    serviceTypes: [],
    selectedService: {},
  }),
  actions: {
    setServices(data) {
      this.services = data
    },
    setAllServices(data) {
      this.allServices = data
    },
    setServiceTypes(data) {
      this.serviceTypes = data
    },
    setSelectedService(data) {
      this.selectedService = data
    },
    clearStore() {
      this.services = []
      this.allServices = []
      this.serviceTypes = []
    }
  },
})
