<template>
  <div class="flex">
    <div class="registration p-7 bg-red-500">
      <div class="logo text-4xl font-semibold">Baby<span class="font-bold text-teal-700">MED</span></div>

      <div class="flex h-screen flex-col items-center justify-center">
        <h3>Login</h3>
        <label for="">
          <input type="email" class="my-2 mb-5 w-80 border-0 rounded" placeholder="Enter your email" required />
        </label>

        <label for="">
          <div class="flex justify-between">
            <span>Password</span>
            <span>Don't remember</span>
          </div>
          <input type="password" class="my-2 w-80 border-0 rounded" placeholder="************" />
          <img src="" alt="" />
        </label>

        <div>
          Stay logged in
          <button>Login now</button>
        </div>
      </div>
    </div>

    <div class="dashboard bg-green-700 p-20">
      <h3 class="text-4xl">"Lost time is never found again."</h3>
      <span class="text-xl">-- Benjamin Franklin</span>

      <div class="mt-20">
        <img src="../assets/icons/dashboard.png" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.registration {
  width: 40%;
}
.dashboard {
  flex: 1;
}
.logo {
  padding: 10px;
}
</style>
