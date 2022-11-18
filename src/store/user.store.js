import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    doctors: [],
  }),
  actions: {
    setUsers(data) {
      this.users.push(...data)
    },
    setDoctors(data) {
      this.doctors = data
    },
    clearStore() {
      this.users = []
    },
  },
})
