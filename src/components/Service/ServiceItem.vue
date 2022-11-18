<script setup>
import 'v3-infinite-loading/lib/style.css'
import { ref, toRefs, watch } from 'vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import EditIcon from '../../assets/icons/EditIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import ServicesService from '../../services/services.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useServicesStore } from '../../store/services.store'
import { useModalStore } from '../../store/modal.store'

const props = defineProps({
  services: { type: Array, required: true },
})

const { services } = toRefs(props)
const selectedServiceId = ref('')

const deleteService = (s_id) => {
  selectedServiceId.value = s_id
  useModalStore().openDeleteAlert()
}

watch(
  () => useModalStore().confirmDelete,
  (confirm) => {
    if (confirm) {
      ServicesService.deleteService(selectedServiceId.value)
        .then(() => {
          notify.success({
            message: 'Service successfully deleted!',
          })
          ServicesService.getAllServices().then((res) => {
            useServicesStore().setServices(res)
          })
          selectedServiceId.value = ''
        })
        .catch(() => {
          notify.warning({
            message: 'Error while deleting service!',
          })
        })
    }
  }
)
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(service, idx) in services" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-3 px-6 text-left uppercase">
      {{ service?.name }}
    </td>
    <td v-motion-pop class="py-3 px-6 text-left">
      {{ useMoneyFormatter(service?.cost) }}
    </td>
    <td v-motion-pop class="py-3 px-6 text-center">
      <div class="flex item-center justify-center">
        <div class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
        <div @click="deleteService(service?.id)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
