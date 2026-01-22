<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="min-vh-100 bg-light">
    <Navbar />
    <main class="pb-4">
      <router-view />
    </main>
  </div>
</template>
