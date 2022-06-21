<template>
  <div class="flex w-full items-center font-sans px-4 pt-6 pb-12">
    <img class="w-10 h-10 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of Author">
    <div class="flex-1 px-2">
      <p class="text-base font-bold text-base md:text-xl leading-none mb-2">
        {{ author }}
      </p>
      <p class="text-gray-600 text-xs md:text-base">
        {{ email }}
      </p>
    </div>
    <div class="justify-end">
      <button class="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Read More</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  author: String,
  email: String,
});

</script>
