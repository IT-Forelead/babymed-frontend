<script setup>
import { ref } from '@vue/reactivity'
import { onMounted } from 'vue'
import RoleService from '../../services/role.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import LoadingIcon from '../../assets/icons/LoadingIcon.vue'

const { t } = useI18n()

const isLoading = ref(false)
const defaultRole = ref([])

onMounted(() => {
    RoleService.getDefaultRoles()
        .then((res) => {
            defaultRole.value = res
        })
})
</script>

<template>
    <div class="space-y-5">
        <div>
            <label for="roleName">
                {{ $t('roleName') }}
            </label>
            <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg" type="text" id="roleName"
                :placeholder="$t('enterRoleName')" />
        </div>
        <div>
            <label>
                {{ $t('roleFeatures') }}
            </label>
            <div v-for="(dr, idx) in defaultRole" :key="idx" class="py-1">
                <div class="relative flex space-x-2">
                    <div class="flex h-6 items-center">
                        <input :id="dr?.parent?.id" name="comments" type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    </div>
                    <div class="text-sm leading-6">
                        <label :for="dr?.parent?.id" class="font-medium text-gray-900">
                            {{ dr?.parent?.name }}
                        </label>
                        <!-- <p class="text-gray-500">
                            {{ dr?.parent?.privileges }}                            
                        </p> -->
                    </div>
                </div>
                <div v-for="(cr, idx) in dr?.children" :key="idx" class="ml-8 py-1">
                    <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                            <input :id="cr?.id" name="comments" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        </div>
                        <label :for="cr?.id" class="text-sm leading-6 font-medium text-gray-900">
                            {{ cr?.name }}
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isLoading"
            class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
            <LoadingIcon
                class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
            <span>{{ $t('creatingDoctorShare') }}</span>
        </div>
        <div v-else
            class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
            <span>{{ $t('create') }}</span>
        </div>
    </div>
</template>
<style scoped></style>
