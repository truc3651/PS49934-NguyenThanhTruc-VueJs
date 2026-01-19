<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-6 col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Đăng Nhập</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
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

              <button type="submit" class="btn btn-primary w-100">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const loggedInEventName = 'loggedIn';
const emit = defineEmits([loggedInEventName]);
function login() {
  if (username.value && password.value) {
    emit(loggedInEventName, username.value);
  }
}
</script>
