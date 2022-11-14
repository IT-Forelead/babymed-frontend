import { defineStore } from 'pinia'

export const useDropStore = defineStore('drop', {
  state: () => ({
    selectPatientOption: '',
    selectDoctorOption: '',
    selectServiceOption: '',
    isOpenPatientDropDown: false,
    isOpenDoctorDropDown: false,
    isOpenServiceDropDown: false,
  }),
  actions: {
    setSelectPatientOption(data) {
      this.selectPatientOption = data
    },
    setSelectDoctorOption(data) {
      this.selectDoctorOption = data
    },
    setSelectServiceOption(data) {
      this.selectServiceOption = data
    },
    openPatientDropDown() {
      this.isOpenPatientDropDown = true
    },
    closePatientDropDown() {
      this.isOpenPatientDropDown = false
    },
    openDoctorDropDown() {
      this.isOpenDoctorDropDown = true
    },
    closeDoctorDropDown() {
      this.isOpenDoctorDropDown = false
    },
    openServiceDropDown() {
      this.isOpenServiceDropDown = true
    },
    closeServiceDropDown() {
      this.isOpenServiceDropDown = false
    },
  },
})
