<script setup>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import RoleService from '../services/role.service'
import { useRoleStore } from '../store/role.store'
import { useModalStore } from '../store/modal.store'
import TrashIcon from '../assets/icons/TrashIcon.vue'

const roles = computed(() => {
    return useRoleStore().roles
})

onMounted(() => {
    RoleService.getRoles()
        .then((res) => {
            useRoleStore().clearStore()
            useRoleStore().setRoles(res)
        })
})
</script>

<template>
    <div class="bg-white rounded-lg w-full p-5">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-bold">{{ $t('rolesReport') }}</p>
            <div class="flex items-center space-x-3">
                <div @click="useModalStore().openAddRoleModal()"
                    class="bg-black text-white rounded-xl p-2 px-4 cursor-pointer hover:bg-black/75">
                    <p class="text-base">{{ $t('createRole') }}</p>
                </div>
            </div>
        </div>
        <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden mt-3 users-wrapper">
            <table class="min-w-max w-full table-auto">
                <thead class="sticky z-10 top-0 bg-white shadow">
                    <tr class="text-gray-600 capitalize text-lg leading-normal">
                        <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
                        <th class="py-2 px-4 text-left">{{ $t('roleName') }}</th>
                        <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium"
                        v-for="(role, idx) in roles" :key="idx">
                        <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
                        <td v-motion-pop class="py-2 px-4 text-left">{{ role?.name }}</td>
                        <td v-motion-pop class="py-2 px-4 text-center">
                            <div class="flex item-center justify-center">
                                <div
                                    class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
                                    <TrashIcon class="w-6 h-6" />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="roles.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
        </div>
    </div>
</template>

<style scoped></style>
