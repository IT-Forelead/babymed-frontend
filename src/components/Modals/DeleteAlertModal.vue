<script setup>
import { useModalStore } from '../../store/modal.store'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useServicesStore } from '../../store/services.store'
import { useUserStore } from '../../store/user.store'
import WarningCircleIcon from '../../assets/icons/WarningCircleIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import moment from 'moment'
import { useCheckupExpenseStore } from '../../store/checkupExpense.store'
import UserService from '../../services/user.service'
import PatientService from '../../services/patient.service'
import ServicesService from '../../services/services.service'
import CheckupExpenseService from '../../services/checkupExpenses.service'
import OperationExpensesService from '../../services/operationExpenses.service'
import { useExpenseStore } from '../../store/expense.store'
import { usePatientStore } from '../../store/patient.store'

const { t } = useI18n()

const closeModal = () => {
  useServicesStore().setSelectedService({})
  useServicesStore().setSelectedServiceType({})
  useUserStore().setSelectedUser({})
  usePatientStore().setSelectedPatient({})
  useCheckupExpenseStore().setSelectedDoctorShare({})
  useModalStore().closeDeleteAlertModal()
}

const deleteUser = (id) => {
  UserService.deleteUser(id)
    .then(() => {
      notify.success({
        message: t('deletedUser'),
      })
      UserService.getUsers({}).then((res) => {
        useUserStore().clearStore()
        useUserStore().setUsers(res?.data)
      })
      closeModal()
    })
    .catch(() => {
      notify.warning({
        message: t('errorDeletingUser'),
      })
    })
}

const deletePatient = (id) => {
  PatientService.deletePatient(id)
    .then(() => {
      notify.success({
        message: t('deletedPatient'),
      })
      PatientService.getPatients({}).then((res) => {
        usePatientStore().clearStore()
        usePatientStore().setPatients(res?.data)
      })
      closeModal()
    })
    .catch(() => {
      notify.warning({
        message: t('errorDeletingPatient'),
      })
    })
}

const deleteServiceType = (id) => {
  ServicesService.deleteServiceType(id)
    .then(() => {
      notify.success({
        message: t('succesfullyDeleted'),
      })
      ServicesService.getAllServiceTypes().then((res) => {
        useServicesStore().setServiceTypes(res)
      })
      closeModal()
    })
    .catch(() => {
      notify.warning({
        message: t('errorServiceType'),
      })
    })
}

const deleteService = (id) => {
  ServicesService.deleteService(id)
    .then(() => {
      notify.success({
        message: t('deletedService'),
      })
      ServicesService.getAllServices().then((res) => {
        useServicesStore().setAllServices(res)
      })
      closeModal()
    })
    .catch(() => {
      notify.warning({
        message: t('errorDeletingService'),
      })
    })
}

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
      closeModal()
    })
    .catch(() => {
      notify.warning({
        message: t('errorDeletingDoctorShare'),
      })
    })
}

const deleteOperationService = (id) => {
  OperationExpensesService.deleteOperationService(id)
    .then(() => {
      notify.success({
        message: t('deletedOperationService'),
      })
      OperationExpensesService.getAllOperationServices().then((res) => {
        useExpenseStore().clearStore()
        useExpenseStore().setOperationServices(res)
      })
      closeModal()
    })
    .catch(() => {
      notify.warning({
        message: t('errorDeletingOperationService'),
      })
    })
}

const selectedService = computed(() => {
  return useServicesStore().selectedService
})

const selectedServiceType = computed(() => {
  return useServicesStore().selectedServiceType
})

const selectedOperationService = computed(() => {
  return useExpenseStore().selectedOperationService
})

const selectedUser = computed(() => {
  return useUserStore().selectedUser
})

const selectedDoctorShare = computed(() => {
  return useCheckupExpenseStore().selectedDoctorShare
})

const selectedPatient = computed(() => {
  return usePatientStore().selectedPatient
})
</script>

<template>
  <div v-if="useModalStore().isOpenDeleteAlertModal" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative max-w-xl p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('deleteData') }}</div>
          <button @click="closeModal()" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <TimesIcon />
          </button>
        </div>

        <!-- Service Section -->
        <div v-if="selectedService?.id" class="py-4 px-6 text-center space-y-6">
          <div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('serviceName') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedService?.name }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('serviceType') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedService?.serviceTypeName }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('servicePrice') }}:</div>
              <div class="text-gray-700 text-sm font-bold italic">{{ useMoneyFormatter(selectedService?.price) }}</div>
            </div>
          </div>
          <h3 class="flex items-center justify-center mb-5 text-lg font-normal text-red-500 dark:text-gray-400 text-center">
            <WarningCircleIcon class="w-7 h-7 mr-2" />
            {{ $t('doYouDelete') }}
          </h3>
          <button @click="deleteService(selectedService?.id)" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            {{ $t('yesImSure') }}
          </button>
          <button @click="closeModal()" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ $t('noCancel') }}
          </button>
        </div>

        <!-- Operation Service Section -->
        <div v-if="selectedOperationService?.operationService?.id" class="py-4 px-6 text-center space-y-6">
          <div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('serviceName') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedOperationService?.service?.name }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('serviceType') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedOperationService?.service?.serviceTypeName }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('servicePrice') }}:</div>
              <div class="text-gray-700 text-sm font-bold italic">{{ useMoneyFormatter(selectedOperationService?.service?.price) }}</div>
            </div>
          </div>
          <h3 class="flex items-center justify-center mb-5 text-lg font-normal text-red-500 dark:text-gray-400 text-center">
            <WarningCircleIcon class="w-7 h-7 mr-2" />
            {{ $t('doYouDelete') }}
          </h3>
          <button @click="deleteOperationService(selectedOperationService?.operationService?.id)" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            {{ $t('yesImSure') }}
          </button>
          <button @click="closeModal()" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ $t('noCancel') }}
          </button>
        </div>

        <!-- User Section -->
        <div v-if="selectedUser?.id" class="py-4 px-6 text-center space-y-6">
          <div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('user') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedUser?.firstname + ' ' + selectedUser?.lastname }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('phone') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedUser?.phone }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('role') }}:</div>
              <div class="text-lg text-gray-700 uppercase">{{ selectedUser?.role }}</div>
            </div>
            <div v-if="selectedUser?.subRoleId" class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('subRole') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedUser?.subRoleName }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('createdAt') }}:</div>
              <div class="text-lg text-gray-700">{{ moment(selectedUser?.createdAt).format('DD/MM/YYYY H:mm') }}</div>
            </div>
          </div>
          <h3 class="flex items-center justify-center mb-5 text-lg font-normal text-red-500 dark:text-gray-400 text-center">
            <WarningCircleIcon class="w-7 h-7 mr-2" />
            {{ $t('doYouDelete') }}
          </h3>
          <button @click="deleteUser(selectedUser?.id)" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            {{ $t('yesImSure') }}
          </button>
          <button @click="closeModal()" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ $t('noCancel') }}
          </button>
        </div>

        <!-- User Section -->
        <div v-if="selectedPatient?.patient?.id" class="py-4 px-6 text-center space-y-6">
          <div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('patient') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedPatient?.patient?.firstname + ' ' + selectedPatient?.patient?.lastname }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('phone') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedPatient?.patient?.phone }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('birthday') }}:</div>
              <div class="text-lg text-gray-700">{{ moment(selectedPatient?.patient?.birthday).format('DD/MM/YYYY') }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('address') }}:</div>
              <div class="text-lg text-gray-700">
                {{ selectedPatient?.region?.name }} <br />
                {{ selectedPatient?.city?.name }} <br />
                {{ selectedPatient?.patient?.address }}
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('createdAt') }}:</div>
              <div class="text-lg text-gray-700">{{ moment(selectedPatient?.patient?.createdAt).format('DD/MM/YYYY H:mm') }}</div>
            </div>
          </div>
          <h3 class="flex items-center justify-center mb-5 text-lg font-normal text-red-500 dark:text-gray-400 text-center">
            <WarningCircleIcon class="w-7 h-7 mr-2" />
            {{ $t('doYouDelete') }}
          </h3>
          <button @click="deletePatient(selectedPatient?.patient?.id)" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            {{ $t('yesImSure') }}
          </button>
          <button @click="closeModal()" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ $t('noCancel') }}
          </button>
        </div>

        <!-- Doctor Share Section -->
        <div v-if="selectedDoctorShare?.doctorShare?.id" class="py-4 px-6 text-center space-y-6">
          <div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('doctor') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedDoctorShare?.user?.firstname + ' ' + selectedDoctorShare?.user?.lastname }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('service') }}:</div>
              <div class="text-lg text-gray-700 text-left">
                <div>{{ selectedDoctorShare?.service?.serviceTypeName }}</div>
                <div>{{ selectedDoctorShare?.service?.name }}</div>
                <div class="text-sm font-bold italic">{{ useMoneyFormatter(selectedDoctorShare?.service?.price) }}</div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('doctorShare') }}:</div>
              <div class="text-lg text-gray-700 uppercase">{{ selectedDoctorShare?.doctorShare?.percent }}%</div>
            </div>
          </div>
          <h3 class="flex items-center justify-center mb-5 text-lg font-normal text-red-500 dark:text-gray-400 text-center">
            <WarningCircleIcon class="w-7 h-7 mr-2" />
            {{ $t('doYouDelete') }}
          </h3>
          <button @click="deleteDoctorShare(selectedDoctorShare?.doctorShare?.id)" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            {{ $t('yesImSure') }}
          </button>
          <button @click="closeModal()" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ $t('noCancel') }}
          </button>
        </div>

        <!-- Service Type Section -->
        <div v-if="selectedServiceType?.id" class="py-4 px-6 text-center space-y-6">
          <div class="flex items-center space-x-2">
            <div class="text-base text-gray-500">{{ $t('serviceTypeName') }}:</div>
            <div class="text-lg text-gray-700">{{ selectedServiceType?.name }}</div>
          </div>
          <h3 class="flex items-center justify-center mb-5 text-lg font-normal text-red-500 dark:text-gray-400 text-center">
            <WarningCircleIcon class="w-7 h-7 mr-2" />
            {{ $t('doYouDelete') }}
          </h3>
          <button @click="deleteServiceType(selectedServiceType?.id)" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            {{ $t('yesImSure') }}
          </button>
          <button @click="closeModal()" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ $t('noCancel') }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
