import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    setUsers(data) {
      this.users.push(...data)
    },
    clearStore() {
      this.users = []
    },
  },
})
