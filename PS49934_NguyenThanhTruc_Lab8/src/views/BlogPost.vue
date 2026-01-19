<template>
  <div>
    <div v-if="blog" class="card w-100">
      <div class="card-body d-flex flex-column">
        <h2 class="card-title">{{ blog.title }}</h2>
        <p class="text-muted">ID: {{ blog.id }}</p>
        <p class="card-text flex-grow-1">{{ blog.content }}</p>
        <router-link to="/blogs" class="btn btn-secondary mt-auto">Quay lại danh sách</router-link>
      </div>
    </div>
    <div v-else class="alert alert-warning">
      Không tìm thấy bài viết
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { blogs } from '../data/blogs.js';

const route = useRoute();
const blog = computed(() => {
  return blogs.find((b) => b.id === parseInt(route.params.id));
});
</script>