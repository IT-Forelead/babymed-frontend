import { defineStore } from 'pinia'

export const useSmsMessagesStore = defineStore('smsMessage', {
  state: () => ({
    smsMessages: [],
  }),
  actions: {
    setSmsMessages(data) {
      this.smsMessages.push(...data)
    },
    clearStore() {
      this.smsMessages = []
    },
  },
})
