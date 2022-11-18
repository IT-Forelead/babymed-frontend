<script setup>
import { reactive, ref } from '@vue/reactivity'
import { toRefs, watch } from 'vue'
import AddressService from '../../../services/address.service'
import PatientService from '../../../services/patient.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { usePatientStore } from '../../../store/patient.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
      message: t('plsEnterPatientFirstname'),
    })
  } else if (!patientForm.lastname) {
    notify.warning({
      message: t('plsEnterPatientLastname'),
    })
  } else if (!patientForm.birthday) {
    notify.warning({
      message: t('plsEnterPatientBirthday'),
    })
  } else if (!patientForm.phone) {
    notify.warning({
      message: t('plsEnterPatientPhone'),
    })
  } else if (!patientForm.regionId) {
    notify.warning({
      message: t('plsSelectRegion'),
    })
  } else if (!patientForm.townId) {
    notify.warning({
      message: t('plsSelectTown'),
    })
  } else if (!patientForm.address) {
    notify.warning({
      message: t('plsEnterPatientAddress'),
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
          message: t('patientCreated'),
        })
        PatientService.getPatients({})
          .then((res) => {
            usePatientStore().clearStore()
            setTimeout(() => {
              usePatientStore().setPatients(res?.data)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingPatients'),
            })
          })
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingPatient'),
        })
      })
  }
}
</script>
<template>
  <div class="grid gap-5 grid-cols-2">
    <div>
      <label for="firstname">
        {{ $t('firstname') }}
        <input v-model="patientForm.firstname" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="firstname" :placeholder="$t('enterFirstname')" />
      </label>
      <label for="lastname">
        {{ $t('lastname') }}
        <input v-model="patientForm.lastname" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="lastname" :placeholder="$t('enterLastname')" />
      </label>
      <label for="birthday">
        {{ $t('birthday') }}
        <input v-model="patientForm.birthday" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="date" id="birthday" :placeholder="$t('birthday')" />
      </label>
      <label for="phone">
        {{ $t('phone') }}
        <input v-model="patientForm.phone" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" v-mask="'+998(##) ###-##-##'" placeholder="+998(00) 000-00-00" />
      </label>
    </div>
    <div>
      <p>{{ $t('region') }}</p>
      <select v-model="patientForm.regionId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
        <option value="" selected>{{ $t('selectRegion') }}</option>
        <option v-for="(region, idx) in regions" :key="idx" :value="region?.id">{{ region?.name }}</option>
      </select>
      <div v-if="patientForm.regionId !== ''">
        <p>{{ $t('town') }}</p>
        <select v-model="patientForm.townId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
          <option value="" selected>{{ $t('selectTown') }}</option>
          <option v-for="(city, idx) in cities" :key="idx" :value="city?.id">{{ city?.name }}</option>
        </select>
      </div>
      <label v-if="patientForm.townId !== ''" for="address">
        {{ $t('address') }}
        <input v-model="patientForm.address" id="address" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" :placeholder="$t('enterAddress')" />
      </label>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-5">
    <button @click="clearForm()" class="p-2.5 w-full rounded-lg text-white bg-gray-600 cursor-pointer hover:bg-gray-800">{{ $t('reset') }}</button>
    <button @click="submitPatientData()" class="p-2.5 w-full rounded-lg text-white bg-blue-600 cursor-pointer hover:bg-blue-800">{{ $t('save') }}</button>
  </div>
</template>

<style scoped></style>
