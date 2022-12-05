<script setup></script>
<template>
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
    <p class="text-center">Chart Below</p>
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
</template>
