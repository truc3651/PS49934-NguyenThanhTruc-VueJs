<script setup>
import Navbar from './components/Navbar.vue'
import Alert from './components/Alert.vue'
</script>

<template>
  <div class="min-vh-100 bg-light">
    <Navbar />
    <Alert />
    <main class="pb-4">
      <router-view />
    </main>
  </div>
</template>