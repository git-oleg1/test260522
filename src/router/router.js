import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', 
      name: 'Posts',
      component: () => import('@v/PostsPage.vue'),
      meta: {},
    },
    {
      path: '/post/:id',
      props: true,
      name: 'Post', 
      component: () => import('@v/PostPage.vue'),
      meta: {},
    },
  ]
});

export default router;
