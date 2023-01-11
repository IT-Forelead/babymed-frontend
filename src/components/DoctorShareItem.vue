<script setup>
import UserIcon from '../assets/icons/UserIcon.vue'
import TrashIcon from '../assets/icons/TrashIcon.vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import useMoneyFormatter from '../mixins/currencyFormatter'
import percentCalc from '../mixins/percentCalc'
import { toRefs } from 'vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useCheckupExpenseStore } from '../store/checkupExpense.store'
import CheckupExpenseService from '../services/checkupExpenses.service'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  doctorShares: { type: Array, required: true },
})

const { doctorShares } = toRefs(props)

const deleteDoctorShare = (id) => {
  CheckupExpenseService.deleteDoctorShare(id)
    .then(() => {
      notify.success({
        message: t('deletedDoctorShare'),
      })
      CheckupExpenseService.getAllDocotrShares().then((res) => {
        useCheckupExpenseStore().clearStore()
        useCheckupExpenseStore().setDoctorShares(res)
      })
    })
    .catch(() => {
      notify.warning({
        message: t('errorDeletingDoctorShare'),
      })
    })
}
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(doctorShare, idx) in doctorShares" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-3 px-6 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <div class="text-base leading-5">
          <span class="font-medium capitalize">{{ doctorShare?.user?.firstname + " " + doctorShare?.user?.lastname }}</span>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-3 px-6 text-center capitalize">
      {{ doctorShare?.service?.serviceTypeName }} <br />
      {{ doctorShare?.service?.name }} <br />
      <span class="text-sm font-bold italic">{{ useMoneyFormatter(doctorShare?.service?.price) }}</span>
    </td>
    <td v-motion-pop class="py-3 px-6 text-center">
      {{ doctorShare?.doctorShare?.percent }}% <br>
      <span class="text-sm font-bold italic">
        {{ useMoneyFormatter(percentCalc(doctorShare?.service?.price, doctorShare?.doctorShare?.percent)) }}
      </span>
    </td>
    <td v-motion-pop class="py-3 px-6 text-center">
      <div class="flex item-center justify-center">
        <div @click="deleteDoctorShare(doctorShare?.doctorShare?.id)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
