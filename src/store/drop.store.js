import { defineStore } from 'pinia'

export const useDropStore = defineStore('drop', {
  state: () => ({
    selectPatientOption: '',
    selectDoctorOption: '',
    selectServiceTypeOption: '',
    selectServiceOption: '',
    selectPdfTypeOption: '',
    selectDateRangeOption: '',
    selectDeliveryStatusOption: '',
    selectPaymentStatusOption: '',
    selectSmsMessageTypeOption: '',
    selectedExpense: {},
    selectedExpenseItems: [],
    isOpenPatientDropDown: false,
    isOpenDoctorDropDown: false,
    isOpenServiceTypeDropDown: false,
    isOpenServiceDropDown: false,
    isOpenPdfTemplateDropDown: false,
    isOpenDateRangeDropDown: false,
    isOpenDeliveryStatusDropDown: false,
    isOpenPaymentStatusDropDown: false,
    isOpenSmsMessageTypeDropDown: false,
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
    setSelectDeliveryStatusOption(data) {
      this.selectDeliveryStatusOption = data
    },
    setSelectPaymentStatusOption(data) {
      this.selectPaymentStatusOption = data
    },
    setSelectSmsMessageTypeOption(data) {
      this.selectSmsMessageTypeOption = data
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
    openPaymentStatusDropDown() {
      this.isOpenPaymentStatusDropDown = true
    },
    closePaymentStatusDropDown() {
      this.isOpenPaymentStatusDropDown = false
    },
    openDateRangeDropDown() {
      this.isOpenDateRangeDropDown = true
    },
    closeDateRangeDropDown() {
      this.isOpenDateRangeDropDown = false
    },
    openDeliveryStatusDropDown() {
      this.isOpenDeliveryStatusDropDown = true
    },
    closeDeliveryStatusDropDown() {
      this.isOpenDeliveryStatusDropDown = false
    },
    openSmsMessageTypeDropDown() {
      this.isOpenSmsMessageTypeDropDown = true
    },
    closeSmsMessageTypeDropDown() {
      this.isOpenSmsMessageTypeDropDown = false
    },
    clearStore() {
      this.selectDoctorOption = ''
      this.selectServiceTypeOption = ''
      this.selectPatientOption = ''
      this.selectServiceOption = ''
      this.selectPdfTypeOption = ''
      this.selectDateRangeOption = ''
      this.selectDeliveryStatusOption = ''
      this.selectPaymentStatusOption = ''
      this.selectSmsMessageTypeOption = ''
      this.isOpenDoctorDropDown = false
      this.isOpenPatientDropDown = false
      this.isOpenServiceDropDown = false
      this.isOpenPdfTemplateDropDown = false
      this.isOpenDateRangeDropDown = false
      this.isOpenDeliveryStatusDropDown = false
      this.isOpenPaymentStatusDropDown = false
      this.isOpenSmsMessageTypeDropDown = false
      this.isOpenServiceTypeDropDown = false
      this.selectedExpenseItems = []
      this.selectedCheque = []
    },
  },
})
