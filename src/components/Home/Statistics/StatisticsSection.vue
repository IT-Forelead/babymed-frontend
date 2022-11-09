<script setup>
import BigCard from './BigCard.vue'
import PaymentIcon from '../../../assets/icons/PaymentIcon.vue'
</script>
<template>
  <div class="grid grid-cols-2 gap-5 mb-5">
    <BigCard />
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
</template>
