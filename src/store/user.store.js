import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    doctors: [],
    subRoles: [],
    selectedUser: {},
    partnerDoctors: [],
  }),
  actions: {
    setUsers(data) {
      this.users.push(...data)
    },
    setDoctors(data) {
      this.doctors = data
    },
    setPartnerDoctors(data) {
      this.partnerDoctors = data
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
