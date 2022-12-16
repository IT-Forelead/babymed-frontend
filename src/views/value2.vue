<script setup></script>

<template>
  <div class="overflow-auto mt-3 patients-wrapper flex">
      <table class="min-w-max mr-5 w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
            <th class="py-3 px-6 text-left">{{ $t('doctor') }}</th>
            <th class="py-3 px-6 text-left">{{ $t('service') }}</th>
            <th class="py-3 px-6 text-center">{{ $t('createdAt') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
        </tbody>
      </table>
      <div v-if="patients?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      <div class="form flex flex-col">
      <select class="focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2 mb-3">
        <option value=""></option>
      </select>
      <select class="focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2 mb-3"></select>
      <select class="focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2 mb-3"></select>
      <input type="number" class="focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2 mb-3">

      <button>Qo'shish</button>
    </div>
    </div>



</template>
<style>
.table {
  flex: 1;
}

</style>