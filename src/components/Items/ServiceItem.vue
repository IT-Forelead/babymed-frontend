<script setup>
import 'v3-infinite-loading/lib/style.css'
import { toRefs } from 'vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import EditIcon from '../../assets/icons/EditIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import { useServicesStore } from '../../store/services.store'
import { useModalStore } from '../../store/modal.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  services: { type: Array, required: true },
})

const { services } = toRefs(props)

const editService = (selectedService) => {
  useModalStore().openEditServiceModal()
  useServicesStore().setSelectedService(selectedService)
}

const deleteService = (selectedService) => {
  useModalStore().openDeleteAlertModal()
  useServicesStore().setSelectedService(selectedService)
}
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(service, idx) in services" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase">{{ service?.serviceTypeName }}</td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase">{{ service?.name }}</td>
    <td v-motion-pop class="py-2 px-4 text-left text-sm font-bold italic">{{ useMoneyFormatter(service?.price) }}</td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <div @click="editService(service)" class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
        <div @click="deleteService(service)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
