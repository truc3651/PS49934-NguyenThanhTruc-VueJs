<template>
  <div class="container col-sm-8 mt-5">
    <h1>Ứng dụng nhỏ với VueJS</h1>
    <CreatePost @add-post="addPost" />
    <PostList :posts="posts" />
  </div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {ref} from 'vue'
import CreatePost from './components/CreatePost.vue';
import PostList from './components/PostList.vue';

const posts = ref([{
  title: 'Bật mí 8 nguyên tắc phối màu quần áo sành điệu',
  author: 'Nguyễn Văn Tèo',
  content: 'Bạn có thể phối màu xanh lá, quần màu kem, giày màu tím theo cách phối đồ kiểu tam giác'
}])
function addPost(post) {
  posts.value.push(post)
}
</script>