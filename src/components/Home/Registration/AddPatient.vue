<script setup>

const countries = ['Uzbekistan', 'United Kingdom', 'USA', 'UK', 'French', 'Spain0', 'Australia', 'Japan', 'China']
</script>
<template>
  <form class="flex justify-between">
    <div class="mr-12">
      <label for="firstname"
        >FirstName
        <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="firstname" placeholder="Enter your firstname" />
      </label>
      <label for="lastname"
        >Lastname
        <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="lastname" placeholder="Enter your lastname" />
      </label>
      <label for="birthday"
        >Birthday
        <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="date" id="birthday" placeholder="Enter your birthday" />
      </label>
      <label for="phone"
        >Phone
        <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" v-mask="'+998(##) ###-##-##'" placeholder="Enter your phone number" value="+998" />
      </label>
    </div>
    <div>
      <p>Region</p>
      <select class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
        <option v-for="(country, index) in countries" :key="index" :value="country">{{ country }}</option>
      </select>
      <p>Town</p>
      <select class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
        <option value="uzb">Uzbekistan</option>
        <option value="uzb">Uzbekistan</option>
        <option value="uzb">Uzbekistan</option>
        <option value="uzb">Uzbekistan</option>
      </select>
      <p></p>
      <label for=""
        >Adress
        <input v-model="data" class="w-80 border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" placeholder="Enter your address" />
      </label>
    </div>
  </form>
  <div class="bg-[#e9e0e0] flex justify-between mt-5 w-full">
    <input class="font-bold rounded-lg p-2.5 w-1/2 mr-5 text-white bg-blue-600 cursor-pointer hover:bg-blue-800" type="reset" value="Reset" />
    <input class="font-bold p-2.5 w-1/2 rounded-lg text-white bg-blue-600 cursor-pointer hover:bg-blue-800" type="submit" value="Send" />
  </div>
</template>

<style scoped></style>