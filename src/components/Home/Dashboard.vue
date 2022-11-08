<script setup>
import PaymentIcon from '../../assets/icons/PaymentIcon.vue'
import Registration from './Registration.vue'
import ReportItem from './ReportItem.vue'
</script>

<template>
  <div class="grid grid-cols-2 gap-5 mb-5">
    <div class="bg-white rounded-lg w-full p-5">
      <h1 class="text-3xl font-bold">Heart Rate</h1>
      <div class="flex items-center justify-between">
        <p class="font-medium text-lg">Heart Candition</p>
        <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
          <option value="" selected>Every month</option>
          <option value="1">Test</option>
        </select>
      </div>
      <div class="flex items-center space-x-4">
        <p class="text-4xl font-bold">30%</p>
        <div class="rounded-lg bg-lime-300 px-1">+4.2%</div>
      </div>
      <p class="text-center">Chart below</p>
      <div class="flex items-baseline space-x-10 justify-center">
        <div class="h-14 w-10 rounded bg-gray-100"></div>
        <div class="h-24 w-10 rounded bg-gray-100"></div>
        <div class="h-32 w-10 rounded bg-gray-100"></div>
        <div class="h-44 w-10 rounded bg-gray-100"></div>
        <div class="h-56 w-10 rounded bg-gray-100"></div>
        <div class="h-32 w-10 rounded bg-gray-100"></div>
        <div class="h-44 w-10 rounded bg-gray-100"></div>
        <div class="h-56 w-10 rounded bg-gray-100"></div>
      </div>
    </div>
    <div class="space-y-5">
      <div class="grid grid-cols-2 gap-5">
        <div class="bg-lime-300 rounded-lg w-full p-5">
          <div class="flex justify-between mb-3">
            <div>
              <p>Bill Due</p>
              <p class="text-2xl font-bold">1,8M+ UZS</p>
            </div>
            <div class="rounded-xl p-3 bg-gray-100 flex items-center justify-center">
              <PaymentIcon class="w-7 h-7" />
            </div>
          </div>
          <div class="flex items-baseline space-x-3">
            <div class="h-14 w-7 rounded bg-gray-100"></div>
            <div class="h-24 w-7 rounded bg-gray-900"></div>
            <div class="h-28 w-7 rounded bg-gray-100"></div>
            <div class="h-14 w-7 rounded bg-gray-100"></div>
            <div class="h-24 w-7 rounded bg-gray-100"></div>
            <div class="h-32 w-7 rounded bg-gray-900"></div>
            <div class="h-14 w-7 rounded bg-gray-100"></div>
          </div>
        </div>
        <div class="bg-white rounded-lg w-full p-5">
          <div class="flex justify-between mb-3">
            <div>
              <p>Bill Due</p>
              <p class="text-2xl font-bold">1,8M+ UZS</p>
            </div>
            <div class="rounded-xl p-3 bg-gray-100 flex items-center justify-center">
              <PaymentIcon class="w-7 h-7" />
            </div>
          </div>
          <div class="flex items-baseline space-x-3">
            <div class="h-14 w-7 rounded bg-lime-300"></div>
            <div class="h-24 w-7 rounded bg-gray-900"></div>
            <div class="h-28 w-7 rounded bg-lime-300"></div>
            <div class="h-14 w-7 rounded bg-lime-300"></div>
            <div class="h-24 w-7 rounded bg-lime-300"></div>
            <div class="h-32 w-7 rounded bg-gray-900"></div>
            <div class="h-14 w-7 rounded bg-lime-300"></div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div class="bg-white rounded-lg w-full p-5 space-y-7">
          <div class="flex justify-between mb-3">
            <div>
              <p>Bill Due</p>
              <p class="text-2xl font-bold">1,8M+ UZS</p>
            </div>
            <div class="rounded-xl p-3 bg-gray-100 flex items-center justify-center">
              <PaymentIcon class="w-7 h-7" />
            </div>
          </div>
          <p>Lorem, ipsum dolor.</p>
        </div>
        <div class="bg-white rounded-lg w-full p-5 space-y-7">
          <div class="flex justify-between mb-3">
            <div>
              <p>Bill Due</p>
              <p class="text-2xl font-bold">1,8M+ UZS</p>
            </div>
            <div class="rounded-xl p-3 bg-gray-100 flex items-center justify-center">
              <PaymentIcon class="w-7 h-7" />
            </div>
          </div>
          <p>Lorem, ipsum dolor.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">Patients Report</p>
      <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
        <option value="" selected>Every month</option>
        <option value="1">Test</option>
      </select>
    </div>
    <div class="h-96 overflow-auto">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-3 px-6 text-center">No</th>
            <th class="py-3 px-6 text-left">Client</th>
            <th class="py-3 px-6 text-left">Phone</th>
            <th class="py-3 px-6 text-center">Checking date</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Checking type</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <ReportItem />
        </tbody>
      </table>
    </div>
  </div>
  <!-- Registration Modal (Payment & Patient) -->
  <Registration />
</template>


