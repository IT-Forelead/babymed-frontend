import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    doctors: [],
    subRoles: [],
    selectedUser: {},
  }),
  actions: {
    setUsers(data) {
      this.users.push(...data)
    },
    setDoctors(data) {
      this.doctors = data
    },
    setSubRoles(data) {
      this.subRoles = data
    },
    setSelectedUser(data) {
      this.selectedUser = data
    },
    clearStore() {
      this.users = []
    },
  },
})
