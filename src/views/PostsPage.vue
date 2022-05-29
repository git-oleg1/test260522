<template>
  <div 
    class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal min-h[300px]"
    style="font-family:Georgia,serif;">
    <!--Title-->
    <div class="font-sans mb-8">
      <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
        Лента новостей
      </h1>
    </div>

    <div v-if="loading === true">
      <LoadingSpinner/>
    </div>
    <template v-else >
      <div class="text-base md:text-sm mb-6">
        <b>Сортировать:</b>&nbsp;
        <span class="text-gray-400">
          <span @click="sortForward" class=" px-2" :class="{
            'text-green-500': sortDirection === 'asc'
          }">a - z</span>
          <span @click="sortBackward" class=" px-2" :class="{
            'text-green-500': sortDirection === 'desc'
          }">z - a</span>
        </span>

        <span class="mx-4">|</span>

        <input v-model="author" class="p-2 w-[160px]" type="text" placeholder="Поиск по автору">
      </div>
      <template v-for="post in posts.posts">
        <post-list-item 
          :title="post.title" 
          :id="post.id" 
          :author="post.author"
          :published="post.published_at"
          class="mb-6"
        />
      </template>
    </template>

    <!--Next & Prev Links-->
    <next-prev-buttons/>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
	import NewsAuthor from '@c/NewsAuthor.vue';
  import PostListItem from '@c/PostListItem.vue';
  import NextPrevButtons from '@c/NextPrevButtons.vue';
  import LoadingSpinner from '@c/LoadingSpinner.vue';
  import { Api } from '@/api/api';

  const posts = ref([]);
  const loading = ref(true);
  const sortDirection = ref('asc');
  const author = ref();

  function loadPosts() {
    const api = new Api('local');
    const params = {
      sort: sortDirection.value,
      author: author.value
    };
    api.getPosts(0, 10, params).then((data) => {
      posts.value = data;
      loading.value = false;
    });
  }

  function sortForward() {
    sortDirection.value = 'asc';
    loadPosts()
  }

  function sortBackward() {
    sortDirection.value = 'desc';
    loadPosts()
  }

  onMounted(() => {
    loadPosts();
  });
</script>
