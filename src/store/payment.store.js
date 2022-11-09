import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    payments: [],
  }),
  actions: {
    setPayments(data) {
      this.payments.push(...data)
    },
    clearStore() {
      this.payments = []
    },
    deleteFilter(p_id) {
      this.payments = this.payments?.filter((p) => p?.payment?.id !== p_id)
    },
  },
})
