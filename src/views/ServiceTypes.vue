<script setup>
import { computed, ref } from '@vue/reactivity'
import { useServicesStore } from '../store/services.store'
import { onMounted } from 'vue'
import ServicesService from '../services/services.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import ServiceTypeItem from '../components/Items/ServiceTypeItem.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isLoading = ref(false)

const serviceTypes = computed(() => {
  return useServicesStore().serviceTypes
})

const getServiceTypes = () => {
  ServicesService.getAllServiceTypes().then((res) => {
    useServicesStore().setServiceTypes(res)
  })
}
onMounted(() => {
  getServiceTypes()
})

const serviceType = ref('')

const clearFields = () => {
  serviceType.value = ''
}

const submitServiceTypeData = () => {
  if (!serviceType.value) {
    notify.warning({
      message: t('plsEnterServiceTypeName'),
    })
  } else {
    isLoading.value = true
    ServicesService.createServiceType(serviceType.value)
      .then(() => {
        notify.success({
          message: t('serviceTypeCreated'),
        })
        getServiceTypes()
        clearFields()
        isLoading.value = false
      })
      .catch(() => {
        notify.warning({
          message: t('errorCreatingService'),
        })
        setTimeout(() => {
          isLoading.value = false
        }, 3000)
      })
  }
}
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-white rounded-lg mt-3 p-3">
        <p class="text-3xl font-bold mb-3">{{ $t('createServiceType') }}</p>
        <div class="space-y-5">
          <label for="serviceTypeName">
            {{ $t('serviceType') }}
            <input v-model="serviceType" class="text-gray-500 mb-1 border-none bg-gray-100 rounded-lg w-full text-lg" type="text" id="serviceName" :placeholder="$t('enterServiceName')" />
          </label>
          <div @click="submitServiceTypeData()" :class="isLoading ? 'bg-gray-600' : 'bg-gray-900 hover:bg-gray-800 cursor-pointer'" class="w-full py-3 text-white rounded-lg flex items-center justify-center">
            <svg v-if="isLoading" class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>{{ isLoading ? $t('createServiceType') : $t('createServiceType') }}</span>
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden mt-3 col-span-2 bg-white rounded-lg">
        <div class="flex items-center p-3">
          <p class="text-3xl font-bold">{{ $t('servicesTypeReport') }}</p>
        </div>
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('serviceTypeName') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <ServiceTypeItem :serviceTypes="serviceTypes" />
          </tbody>
        </table>
        <div v-if="serviceTypes.length === 0" class="w-full text-center text-red-500 mt-5">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
