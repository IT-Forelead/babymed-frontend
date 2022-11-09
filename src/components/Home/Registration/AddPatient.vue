<script setup>
import { reactive, ref } from '@vue/reactivity'
import { toRefs, watch } from 'vue'
import AddressService from '../../../services/address.service'
import PatientService from '../../../services/patient.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const props = defineProps({
  regions: { type: Array, required: true },
})

const { regions } = toRefs(props)

const cities = ref([])

const patientForm = reactive({
  firstname: '',
  lastname: '',
  regionId: '',
  townId: '',
  address: '',
  birthday: '',
  phone: '',
})

watch(
  () => patientForm.regionId,
  (r_id) => {
    if (r_id) {
      AddressService.getAllCities(r_id)
        .then((res) => {
          cities.value = res
        })
        .catch((err) => {
          console.log('ERR: ', err)
        })
    }
  },
  { deep: true }
)

const clearForm = () => {
  patientForm.firstname = ''
  patientForm.lastname = ''
  patientForm.regionId = ''
  patientForm.townId = ''
  patientForm.address = ''
  patientForm.address = ''
  patientForm.birthday = ''
  patientForm.phone = ''
}

const submitPatientData = () => {
  if (!patientForm.firstname) {
    notify.warning({
      message: 'Please enter patient firstname!',
    })
  } else if (!patientForm.lastname) {
    notify.warning({
      message: 'Please enter patient lastname!',
    })
  } else if (!patientForm.birthday) {
    notify.warning({
      message: 'Please enter patient birthday!',
    })
  } else if (!patientForm.phone) {
    notify.warning({
      message: 'Please enter patient phone!',
    })
  } else if (!patientForm.regionId) {
    notify.warning({
      message: 'Please select region!',
    })
  } else if (!patientForm.townId) {
    notify.warning({
      message: 'Please select town!',
    })
  } else if (!patientForm.address) {
    notify.warning({
      message: 'Please enter patient address!',
    })
  } else {
    PatientService.createPatient({
      firstname: patientForm.firstname,
      lastname: patientForm.lastname,
      regionId: patientForm.regionId,
      townId: patientForm.townId,
      address: patientForm.address,
      birthday: patientForm.birthday,
      phone: patientForm.phone.replace(/([() -])/g, ''),
    })
      .then(() => {
        clearForm()
        notify.success({
          message: 'Successfully created patient!',
        })
      })
      .catch((err) => {
        notify.error({
          message: 'Error while creating patient!',
        })
        console.log('ERR', err?.message)
      })
  }
}
</script>
<template>
  <div class="grid gap-5 grid-cols-2">
    <div>
      <label for="firstname"
        >FirstName
        <input v-model="patientForm.firstname" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="firstname" placeholder="Enter your firstname" />
      </label>
      <label for="lastname"
        >Lastname
        <input v-model="patientForm.lastname" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="lastname" placeholder="Enter your lastname" />
      </label>
      <label for="birthday"
        >Birthday
        <input v-model="patientForm.birthday" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="date" id="birthday" placeholder="Enter your birthday" />
      </label>
      <label for="phone"
        >Phone
        <input v-model="patientForm.phone" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" v-mask="'+998(##) ###-##-##'" placeholder="+998(00) 000-00-00" />
      </label>
    </div>
    <div>
      <p>Region</p>
      <select v-model="patientForm.regionId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
        <option value="" selected>Select region</option>
        <option v-for="(region, idx) in regions" :key="idx" :value="region?.id">{{ region?.name }}</option>
      </select>
      <div v-if="patientForm.regionId !== ''">
        <p>Town</p>
        <select v-model="patientForm.townId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
          <option value="" selected>Select town</option>
          <option v-for="(city, idx) in cities" :key="idx" :value="city?.id">{{ city?.name }}</option>
        </select>
      </div>
      <label v-if="patientForm.regionId !== ''" for="address"
        >Address
        <input v-model="patientForm.address" id="address" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" placeholder="Enter your address" />
      </label>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-5">
    <button @click="clearForm()" class="p-2.5 w-full rounded-lg text-white bg-gray-600 cursor-pointer hover:bg-gray-800">Reset</button>
    <button @click="submitPatientData()" class="p-2.5 w-full rounded-lg text-white bg-blue-600 cursor-pointer hover:bg-blue-800">Save</button>
  </div>
</template>

<style scoped></style>
