<template>
  <div 
    class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal min-h[300px]"
    style="font-family:Georgia,serif;"
  >

    <div class="font-sans mb-8">
      <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
        Лента новостей
      </h1>
    </div>

    <!-- Start: сортировка и поиск -->
    <div class="text-base font-sans md:text-sm mb-6">
      <b>Сортировать:</b>&nbsp;
      <span class="text-gray-400">
        <span
          @click="toggleSortDirection"
          class="px-2"
          :class="{
            'text-green-500': sortDirection === 'asc',
            'cursor-pointer': sortDirection === 'desc',
          }"
        >
          a - z
        </span>
        <span @click="toggleSortDirection"
          class="px-2"
          :class="{
            'text-green-500': sortDirection === 'desc',
            'cursor-pointer': sortDirection === 'asc',
          }"
        >
          z - a
        </span>
      </span>

      <span class="mx-4">|</span>

      <input
        v-model="author"
        class="p-2 w-[160px]"
        type="text"
        placeholder="Поиск по автору"
      >
    </div>
    <!-- End: сортировка и поиск -->

    <div
      v-if="loading === true"
      class="font-sans p-2 text-green-500"
    >
      Идет загрузка...
    </div>

    <template v-for="post in posts">
      <post-list-item
        :title="post.title"
        :id="post.id"
        :author="post.author"
        :published="post.published_at"
        class="mb-6"
      />
    </template>

    <!--Next & Prev Links-->
    <!-- <next-prev-buttons v-if="loading !== true"/> -->
  </div>
</template>

<script>
import PostListItem from '@c/PostListItem.vue'
import ListMixin from '@/mixins/list-mixin'
import { Api } from '@/api/api'

export default {
  components: {
    PostListItem,
  },
  mixins: [ListMixin],
  data() {
    return {
      sortDirection: 'asc',
      author: '',
    }
  },
  computed: {
    posts() {
      return this.items
    },
    loading() {
      return this.isLoadingItems
    },
  },
  methods: {
    toggleSortDirection() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    },
    // indirect usage
    async loadItemsApi() {
      const api = new Api('local')
      return api.getPosts(0, 10, {sort: this.sortDirection, author: this.author})
        .then(data => ({...data, items: data.posts}))
    },
  },
  watch: {
    sortDirection() {
      this.loadItems()
    },
    author() {
      this.loadItems()
    }
  },
  mounted() {
    this.loadItems()
  },
}
</script>
