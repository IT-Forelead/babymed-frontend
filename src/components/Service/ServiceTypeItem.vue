<script setup>
import 'v3-infinite-loading/lib/style.css'
import { computed, ref, toRefs, watch } from 'vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import EditIcon from '../../assets/icons/EditIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import ServicesService from '../../services/services.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useServicesStore } from '../../store/services.store'
import { useModalStore } from '../../store/modal.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  serviceTypes: { type: Array, required: true },
})

const { serviceTypes } = toRefs(props)
const selectedServiceTypeId = ref('')

const confirm = computed(() => useModalStore().confirmDelete)

const deleteServiceType2 = (st_id) => {
  selectedServiceTypeId.value = st_id
  // useModalStore().openDeleteAlert()
  ServicesService.deleteServiceType(selectedServiceTypeId.value)
    .then(() => {
      notify.success({
        message: t('succesfullyDeleted'),
      })
      ServicesService.getAllServiceTypes().then((res) => {
        useServicesStore().setServiceTypes(res)
      })
      selectedServiceTypeId.value = ''
    })
    .catch(() => {
      notify.warning({
        message: t('errorServiceType'),
      })
    })
}

const deleteServiceType = (selectedServiceType) => {
  useModalStore().openDeleteAlertModal()
  useServicesStore().setSelectedServiceType(selectedServiceType)
}
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(serviceType, idx) in serviceTypes" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase">
      {{ serviceType?.name }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <!-- <div class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div> -->
        <div @click="deleteServiceType(serviceType)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
