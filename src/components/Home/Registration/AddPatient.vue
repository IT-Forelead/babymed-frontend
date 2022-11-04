<script setup></script>
<template>
  <form class="flex justify-between">
    <div class="mr-12">
      <label for="firstname"
        >FirstName
        <input class="w-80 block mb-5" type="text" id="firstname" placeholder="Enter your firstname" />
      </label>

      <label for="lastname"
        >Lastname
        <input class="w-80 block mb-5" type="text" id="lastname" placeholder="Enter your lastname" />
      </label>

      <label for="birthday"
        >Birthday
        <input class="w-80 block mb-5" type="date" id="birthday" placeholder="Enter your birthday" />
      </label>

      <label for="phone"
        >Phone
        <input class="w-80 block mb-5" type="text" placeholder="Enter your phone number" value="+998" />
      </label>

    </div>

    <div>
      <p>Region</p>
      <select class="w-80 mb-5">
        <option value="uzb">Uzbekistan</option>
        <option value="uzb">Uzbekistan</option>
        <option value="uzb">Uzbekistan</option>
        <option value="uzb">Uzbekistan</option>
      </select>

      <p>Town</p>
      <select class="w-80 mb-5">
        <option value="uzb">Uzbekistan</option>
        <option value="uzb">Uzbekistan</option>
        <option value="uzb">Uzbekistan</option>
        <option value="uzb">Uzbekistan</option>
      </select>

      <p></p>
      <label for=""
        >Adress
        <input class="w-80" type="text" placeholder="Enter your address" />
      </label>

    </div>
  </form>
      <div class="bg-[#e9e0e0] flex justify-between mt-5 w-full">
        <input class="font-bold p-2.5 w-1/2  mr-5 text-white bg-[#671ddf]" type="reset" value="Reset" />
        <input class="font-bold p-2.5 w-1/2  text-white bg-[#671ddf]" type="submit" value="Send" />
      </div>
</template>

<style scoped></style>
