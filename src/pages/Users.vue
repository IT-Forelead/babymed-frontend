<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { useServicesStore } from '../store/services.store'
import { onMounted } from 'vue'
import ServiceItem from '../components/Service/ServiceItem.vue'
import AddUser from '../components/Home/Registration/AddUser.vue'
import ServicesService from '../services/services.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const isLoading = ref(false)

const services = computed(() => {
  return useServicesStore().services
})

const getServices = () => {
  ServicesService.getAllServices().then((res) => {
    useServicesStore().setServices(res)
  })
}
onMounted(() => {
  getServices()
})

const userFormData = reactive({
  firstname: '',
  lastname: '',
  role: '',
  phone: '',
})

const clearFields = () => {
  serviceData.name = ''
  serviceData.cost = 0
}

const submitServiceData = () => {
  if (!serviceData.name) {
    notify.warning({
      message: 'Please enter service name!',
    })
  } else if (serviceData.cost == 0) {
    notify.warning({
      message: 'Please enter service price!',
    })
  } else {
    isLoading.value = true
    ServicesService.createService({
      name: serviceData.name,
      cost: serviceData.cost,
    })
      .then(() => {
        notify.success({
          message: 'Service successfully created!',
        })
        getServices()
        clearFields()
        isLoading.value = false
      })
      .catch(() => {
        notify.warning({
          message: 'Error while creating service!',
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
    <!-- <div class="flex items-center justify-between bg-white rounded-lg p-3">
      <p class="text-3xl font-bold">Services Management</p>
      <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
        <option value="" selected>{{ $t('sortBy') }}</option>
        <option value="1">Sort 1</option>
        <option value="2">Sort 2</option>
      </select>
    </div> -->
    <div class="grid grid-cols-3 gap-3">
      <AddUser />
      <div class="max-h-[77vh] overflow-auto mt-3 col-span-2 bg-white rounded-lg">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
              <th class="py-3 px-6 text-left">Service Name</th>
              <th class="py-3 px-6 text-left">Price</th>
              <th class="py-3 px-6 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <ServiceItem :services="services" />
          </tbody>
        </table>
        <div v-if="services.length === 0" class="w-full text-center text-red-500 mt-5">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
