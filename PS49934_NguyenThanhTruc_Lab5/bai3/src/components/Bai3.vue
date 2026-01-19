<template>
  <div class="container col-sm-8 mt-5">
    <h1>Thông tin cá nhân</h1>
    <form>
      <div class="mb-3">
        <label for="name" class="form-label">Họ và Tên:</label>
        <input
          v-model="userInfo.name"
          id="name"
          type="text"
          class="form-control"
          placeholder="Nhập họ và tên"
        />
      </div>
      <div class="mb-3">
        <label for="age" class="form-label">Tuổi:</label>
        <input
          v-model="userInfo.age"
          id="age"
          type="number"
          class="form-control"
          placeholder="Nhập tuổi"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input
          v-model="userInfo.email"
          aria-describedby="emailHelp"
          id="email"
          type="email"
          class="form-control"
          placeholder="Nhập email"
        />
      </div>
    </form>
    <div class="info-display mt-4 p-3 bg-dark text-white rounded">
      <h2>Thông tin đã nhập:</h2>
      <p><strong>Họ và Tên:</strong> {{ userInfo.name }}</p>
      <p><strong>Tuổi:</strong> {{ userInfo.age }}</p>
      <p><strong>Email:</strong> {{ userInfo.email }}</p>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
const userInfo = reactive({
  name: '',
  age: null,
  email: '',
});
</script>
