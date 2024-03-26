import { defineStore } from 'pinia'

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [],
    defaultRoles: [],
    selectedRole: {},
  }),
  actions: {
    setRoles(data) {
      this.roles.push(...data)
    },
    setDefaultRoles(data) {
      this.defaultRoles.push(...data)
    },
    setSelectedRole(data) {
      this.selectedRole = data
    },
    clearStore() {
      this.roles = []
      this.defaultRoles = []
    },
  },
})
