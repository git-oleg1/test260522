<template>
  <div class="px-8 py-8 shadow border-gray-600 border-1">
    <div>
      <router-link :to="{name: 'Post', params: {id: id}}">{{ title }}</router-link>
    </div>
    <div>
      <span class="text-base md:text-sm text-green-500 pr-[18px]">Автор: {{ author }}</span>
      <span class="text-base md:text-sm text-green-500">{{ published }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'id',
    'author',
    'published'
  ]
}
</script>
