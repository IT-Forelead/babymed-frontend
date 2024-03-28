<script setup>
import { reactive, ref } from '@vue/reactivity'
import { useRecommendersStore } from '../../store/recommenders.store'
import { useDropStore } from '../../store/drop.store'
import RecommenderService from '../../services/recommenders.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import LoadingIcon from '../../assets/icons/LoadingIcon.vue'

const { t } = useI18n()

const isLoading = ref(false)

const moneyConf = {
  suffix: ' %',
  precision: 0,
  min: 0,
  max: 100,
}

const recommenderForm = reactive({
  firstname: '',
  lastname: '',
  phone: '',
  percent: '',
})

const clearForm = () => {
  recommenderForm.firstname = ''
  recommenderForm.lastname = ''
  recommenderForm.phone = ''
  recommenderForm.percent = ''
}

const submitRecommenderData = () => {
  if (!recommenderForm.firstname) {
    notify.warning({
      message: t('plsEnterRecommenderFirstname'),
    })
  } else if (!recommenderForm.lastname) {
    notify.warning({
      message: t('plsEnterRecommenderLastname'),
    })
  } else if (!recommenderForm.phone) {
    notify.warning({
      message: t('plsEnterRecommenderPhone'),
    })
  } else if (!recommenderForm.percent) {
    notify.warning({
      message: t('plsEnterRecommenderShare'),
    })
  } else {
    isLoading.value = true
    RecommenderService.createRecommender(
      cleanObjectEmptyFields({
        firstname: recommenderForm.firstname,
        lastname: recommenderForm.lastname,
        phone: recommenderForm.phone.replace(/([() -])/g, ''),
        percent: +recommenderForm.percent,
      })
    )
      .then(() => {
        clearForm();
        notify.success({
          message: t('createdRecommender'),
        })
        RecommenderService.getAllRecommenders().then((res) => {
          useRecommendersStore().clearStore()
          useRecommendersStore().setRecommenders(res.data)
        })
        useDropStore().clearStore()
        isLoading.value = false
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingRecommender'),
        })
      })
  }
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <label for="firstname">{{ $t('firstname') }}</label>
      <input v-model="recommenderForm.firstname"
        class="text-gray-500 mb-3 border-none bg-gray-100 rounded-lg w-full text-lg" type="text" id="firstname"
        :placeholder="$t('enterFirstname')" />
    </div>
    <div>
      <label for="lastname">{{ $t('lastname') }}</label>
      <input v-model="recommenderForm.lastname"
        class="text-gray-500 border-none mb-3 bg-gray-100 rounded-lg w-full text-lg" type="text" id="lastname"
        :placeholder="$t('enterLastname')" />
    </div>
    <div>
      <label for="phone">{{ $t('phone') }}</label>
      <input id="phone" v-mask="'+998(##) ###-##-##'" v-model="recommenderForm.phone" type="text"
        class="text-gray-500 mb-3 border-none bg-gray-100 rounded-lg w-full text-lg" placeholder="+998(00) 000-00-00" />
    </div>
    <div>
      <label for="percent">{{ $t('recommenderShare') }}</label>
      <money3 id="percent" v-model="recommenderForm.percent" v-bind="moneyConf"
        class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"></money3>
    </div>

    <div v-if="isLoading"
      class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
      <LoadingIcon
        class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
      <span>{{ $t('creatingRecommender') }}</span>
    </div>
    <div v-else @click="submitRecommenderData()"
      class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
      <span>{{ $t('createRecommender') }}</span>
    </div>
  </div>
</template>
<style scoped></style>
