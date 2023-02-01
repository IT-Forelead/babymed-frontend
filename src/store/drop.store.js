import { defineStore } from 'pinia'

export const useDropStore = defineStore('drop', {
  state: () => ({
    selectPatientOption: '',
    selectDoctorOption: '',
    selectServiceTypeOption: '',
    selectServiceOption: '',
    selectPdfTypeOption: '',
    selectDateRangeOption: '',
    selectedExpense: {},
    selectedExpenseItems: [],
    isOpenPatientDropDown: false,
    isOpenDoctorDropDown: false,
    isOpenServiceTypeDropDown: false,
    isOpenServiceDropDown: false,
    isOpenPdfTemplateDropDown: false,
    isOpenDateRangeDropDown: false,
    selectedCheque: []
  }),
  actions: {
    setSelectPatientOption(data) {
      this.selectPatientOption = data
    },
    setSelectedCheque(data) {
      this.selectedCheque = data
    },
    setSelectedExpense(data) {
      this.selectedExpense = data
    },
    setSelectedExpenseItems(data) {
      this.selectedExpenseItems = data
    },
    setSelectDoctorOption(data) {
      this.selectDoctorOption = data
    },
    setSelectServiceTypeOption(data) {
      this.selectServiceTypeOption = data
    },
    setSelectServiceOption(data) {
      this.selectServiceOption = data
    },
    setSelectPdfTypeOption(data) {
      this.selectPdfTypeOption = data
    },
    setSelectDateRangeOption(data) {
      this.selectDateRangeOption = data
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
    openServiceTypeDropDown() {
      this.isOpenServiceTypeDropDown = true
    },
    closeServiceTypeDropDown() {
      this.isOpenServiceTypeDropDown = false
    },
    openServiceDropDown() {
      this.isOpenServiceDropDown = true
    },
    closeServiceDropDown() {
      this.isOpenServiceDropDown = false
    },
    openPdfTemplateDropDown() {
      this.isOpenPdfTemplateDropDown = true
    },
    closePdfTemplateDropDown() {
      this.isOpenPdfTemplateDropDown = false
    },
    openDateRangeDropDown() {
      this.isOpenDateRangeDropDown = true
    },
    closeDateRangeDropDown() {
      this.isOpenDateRangeDropDown = false
    },
    clearStore() {
      this.selectDoctorOption = ''
      this.selectServiceTypeOption = ''
      this.selectPatientOption = ''
      this.selectServiceOption = ''
      this.selectPdfTypeOption = ''
      this.selectDateRangeOption = ''
      this.isOpenDoctorDropDown = false
      this.isOpenPatientDropDown = false
      this.isOpenServiceDropDown = false
      this.isOpenPdfTemplateDropDown = false
      this.isOpenDateRangeDropDown = false
      this.isOpenServiceTypeDropDown = false
      this.selectedExpenseItems = []
      this.selectedCheque = []
    },
  },
})
