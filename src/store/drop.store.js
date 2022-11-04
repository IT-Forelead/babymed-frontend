import { defineStore } from 'pinia'

export const useDropStore = defineStore('drop', {
  state: () => ({
    selectPatient: '',
    isOpenDropDown: false
  }),
  actions: {
    setSelectPatient(data) {
      this.selectPatient = data
    },
    openDropDown() {
      this.isOpenDropDown = true
    },
    closeDropDown() {
      this.isOpenDropDown = false
    }
  },
})
