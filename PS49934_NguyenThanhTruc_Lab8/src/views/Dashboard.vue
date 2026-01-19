<template>
  <div>
    <div class="alert alert-success">
      <h4 class="alert-heading">Chào mừng {{ username }} đến Dashboard!</h4>
      <p>Bạn đã đăng nhập thành công. Đây là trang được bảo vệ.</p>
      <hr>
      <button @click="handleLogout" class="btn btn-danger">Đăng xuất</button>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <h5 class="card-title">Tổng bài viết</h5>
            <p class="card-text display-4">25</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card text-white bg-success">
          <div class="card-body">
            <h5 class="card-title">Lượt xem</h5>
            <p class="card-text display-4">1,234</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card text-white bg-info">
          <div class="card-body">
            <h5 class="card-title">Bình luận</h5>
            <p class="card-text display-4">89</p>
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
const username = ref(localStorage.getItem('username') || 'Guest');

function handleLogout() {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('username');
  router.push({ name: 'Login' });
}
</script>