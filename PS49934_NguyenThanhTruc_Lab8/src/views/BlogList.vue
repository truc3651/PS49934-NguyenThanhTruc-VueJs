<template>
  <div>
    <h2 class="mb-4">Danh sách các bài viết blog</h2>
    <div class="row">
      <div v-for="blog in blogs" :key="blog.id" class="col-md-4 mb-3 d-flex">
        <div class="card w-100">
          <img :src="blog.image" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ blog.title }}</h5>
            <p class="card-text flex-grow-1">{{ blog.excerpt }}</p>
            <router-link :to="`/blogs/${blog.id}`" class="btn btn-primary mt-auto">
              Xem chi tiết
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { blogs } from '../data/blogs.js';
</script>