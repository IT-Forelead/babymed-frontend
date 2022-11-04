<script>
import EyeSleshIcon from '../assets/icons/EyeSleshIcon.vue'
</script>
<template>
  <div class="h-screen flex overflow-hidden">
    <div class="w-1/3">
      <h3 class="p-5 text-4xl">Baby<span class="text-[#41c3da]">Med</span></h3>
      <div class="h-4/5 flex items-center flex-col justify-center">
        <div class="text-xl w-96 font-bold mb-10">Login</div>
        <div>
          <label for="email" class="cursor-pointer block mb-1">Email</label>
          <input class="w-96 rounded-lg p-2.5" type="email" id="email" placeholder="sign in" />
        </div>
        <div class="flex justify-between w-96 mt-8">
          <label for="password" class="cursor-pointer block mb-1">Password</label>
          <p class="cursor-pointer font-bold text-[#44c5e6]">Do'nt remember?</p>
        </div>
        <div class="flex relative items-center justify-between">
          <input type="password" id="password" class="w-96 rounded-lg p-2.5 border" placeholder="**********" />
          <EyeSleshIcon class="text-black absolute cursor-pointer right-2.5" />
        </div>

        <button class="bg-[#1990fe] cursor-pointer font-bold text-white mt-6 w-96 border-0 py-4 rounded-lg">Login now</button>
      </div>
    </div>

    <div class="flex-1 p-20 relative bg-[#f4f6f8]">
      <div class="mt-2.5 text-2xl block font-bold">
        "Lost time is never found again"
        <span class="block text-[#abaeb9] text-base mt-4">-Benjamin Franklin</span>
      </div>
      <div class="border-[20px] border-solid border-[#ccc] w-screen mt-12 h-screen rounded-[40px] absolute">
        <img src="dashboard.png" class="rounded-3xl w-4/5" />
      </div>
    </div>
  </div>
</template>
