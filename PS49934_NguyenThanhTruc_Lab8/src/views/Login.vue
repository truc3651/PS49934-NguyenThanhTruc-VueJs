<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Đăng nhập</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="username" class="form-label">Tên đăng nhập:</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mật khẩu:</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
          </form>
          <div v-if="message" class="alert alert-info mt-3">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const message = ref('');

function handleLogin() {
  message.value = 'Đăng nhập thành công!';
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('username', username.value);
  setTimeout(() => {
    router.push({ name: 'Dashboard' });
  }, 1500);
}
</script>