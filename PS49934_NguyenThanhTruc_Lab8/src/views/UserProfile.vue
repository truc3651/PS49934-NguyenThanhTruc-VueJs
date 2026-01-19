<template>
  <div>
    <h2 class="mb-4">Thông tin người dùng</h2>
    <div class="row">
      <div class="col-md-3">
        <div class="list-group">
          <router-link
            to="/profile/info"
            class="list-group-item list-group-item-action"
          >
            Thông tin cơ bản
          </router-link>
          <router-link
            to="/profile/settings"
            class="list-group-item list-group-item-action"
          >
            Cài đặt
          </router-link>
        </div>
      </div>
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>