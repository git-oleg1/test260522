<template>
  <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
    <template v-if="loading === false">
      <div class="font-sans">
        <p class="text-base md:text-sm text-green-500 font-bold">
          &lt;
          <router-link 
            :to="{name: 'Home'}" 
            class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
          >
            К списку новостей
          </router-link>
        </p>
        <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{{ post.title }}</h1>
        <p class="text-sm md:text-base font-normal text-gray-600">Published 19 February 2019</p>

        <NewsAuthor />
      </div>

      <p class="py-6">
      👋 {{ post.body }}
      </p>
    </template>
    <template v-else>
      <LoadingSpinner />
    </template>
    
    <!--Divider-->
    <hr class="border-b-2 border-gray-400 mb-8 mx-4">

    <!-- <next-prev-buttons/> -->
  </div>
</template>

<script setup>
  import LoadingSpinner from '@c/LoadingSpinner.vue';
  import NextPrevButtons from '@c/NextPrevButtons.vue';
  import NewsAuthor from '@c/NewsAuthor.vue';
  import { ref, onBeforeMount } from 'vue';
  import { Api } from '@/api/api';

  const props = defineProps({
    id: [Number, String]
  });

  const loading = ref(true);
  const post = ref({});
  const user = ref({});

  onBeforeMount(() => {
    const api = new Api();
    loading.value = true;
    api.getPost(props.id).then(({data}) => {
      post.value = data;
      loading.value = false;
    });
  });
</script>
