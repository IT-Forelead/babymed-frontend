<script setup>
import { computed, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { onMounted } from 'vue'
import MoneyBagIconm from '../../assets/icons/MoneyBagIcon.vue'
import MoneyExchangeIcon from '../../assets/icons/MoneyExchangeIcon.vue'
import DoctorShareItem from '../Items/DoctorShareItem.vue'
import AddDoctorShare from '../Registration/AddDoctorShare.vue'
import CheckupExpenseService from '../../services/checkupExpenses.service'
import UserService from '../../services/user.service'
import { useCheckupExpenseStore } from '../../store/checkupExpense.store'
import { useModalStore } from '../../store/modal.store'
import { useUserStore } from '../../store/user.store'

const dropdown = ref(null)

const doctorShares = computed(() => {
  return useCheckupExpenseStore().doctorShares
})

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

onMounted(() => {
  useCheckupExpenseStore().clearStore()
  CheckupExpenseService.getAllDocotrShares().then((res) => {
    useCheckupExpenseStore().setDoctorShares(res)
  })
  UserService.getAllDoctors({
    role: 'doctor',
  }).then((res) => {
    useUserStore().setDoctors(res?.data)
  })
})
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center space-x-3">
      <router-link to="/checkup-expenses" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyBagIconm class="w-6 h-6 mr-1" />
        {{ $t('checkupExpenses') }}
      </router-link>
      <div>|</div>
      <router-link to="/checkup-expenses/summary" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyBagIconm class="w-6 h-6 mr-1" />
        {{ $t('checkupExpensesReport') }}
      </router-link>
      <div>|</div>
      <div class="bg-lime-400 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyExchangeIcon class="w-6 h-6 mr-1" />
        {{ $t('doctorShares') }}
      </div>
    </div>
    <div class="grid grid- grid-cols-3 mt-5 gap-8">
      <div class="max-h-[75vh] col-span-2 overflow-auto xxl:overflow-x-hidden">
        <div class="flex items-center p-3">
          <p class="text-3xl font-bold">{{ $t('servicesTypeReport') }}</p>
        </div>
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('doctor') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('service') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('doctorShare') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <DoctorShareItem :doctorShares="doctorShares" />
          </tbody>
        </table>
      </div>
      <div class="bg-white rounded-lg p-3">
        <p class="text-3xl font-bold mb-3">{{ $t('createDoctorShare') }}</p>
        <AddDoctorShare />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
