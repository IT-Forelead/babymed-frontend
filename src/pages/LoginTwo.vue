<script setup></script>

<template>
  <div class="flex w-full h-screen overflow-hidden">
    <div class="relative basis-1/3 max-h-screen p-8">
      <img src="/vite.svg" class="p-2 border border-gray-300 rounded-lg" alt="@" />
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 px-4">
        <h1 class="text-2xl font-bold mb-5">Login</h1>
        <div class="flex flex-col space-y-6">
          <label for="phone">
            <p class="font-medium text-gray-500 pb-2">Mobile phone</p>
            <input id="phone" type="text" class="w-full py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter mobile phone" />
          </label>
          <label for="password">
            <div class="flex flex-row items-center justify-between mb-2">
              <p class="font-medium text-gray-500">Password</p>
              <div class="font-medium text-indigo-600 cursor-pointer">Forgot Password?</div>
            </div>
            <input id="password" type="password" class="w-full py-2 border border-gray-300 rounded px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" />
          </label>
          <button class="w-full py-2 font-light text-white bg-gray-900 hover:bg-gray-800 rounded flex items-center justify-center">
            Login
          </button>
        </div>
      </div>
    </div>
    <div class="basis-2/3 max-h-screen bg-slate-200/80 pl-36 pt-44 relative">
      <div class="space-y-3">
        <h1 class="font-bold text-2xl text-gray-900">"Lost time is never found again."</h1>
        <p class="font-medium text-base text-gray-500">- Benjamin Franklin</p>
      </div>
      <div class="absolute bottom-0 right-0 w-full left-36 bg-slate-300/40 p-5 h-[620px] rounded-tl-[42px]">
        <img src="/dashboard.png" class="rounded-tl-3xl" alt="#" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
