<template>
  <div class="font-sans flex justify-between content-center px-4 pb-12">
    <div class="text-left">
      <span class="text-xs md:text-sm font-normal text-gray-600">&lt; {{ backName }}</span><br>
      <p v-if="backTitle"><a href="#" class="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline">{{ backTitle }}</a></p>
    </div>
    <div class="text-right">
      <span class="text-xs md:text-sm font-normal text-gray-600">{{ nextName }} &gt;</span><br>
      <p v-if="nextTitle"><a href="#" class="break-normal text-base md:text-sm text-green-500 font-bold no-underline hover:underline">{{ nextTitle }}</a></p>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    nextName: {
      type: String,
      default: 'Вперед'
    },
    nextTitle: {
      type: String,
      default: ''
    },
    backName: {
      type: String,
      default: 'Назад'
    },
    backTitle: {
      type: String,
      default: ''
    }
  });
</script>
