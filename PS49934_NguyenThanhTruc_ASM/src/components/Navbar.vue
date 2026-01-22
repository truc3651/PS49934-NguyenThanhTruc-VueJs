<script setup>
import { onMounted } from 'vue';
import { useAuth } from '../composables';
import { ROUTES_MAP, AUTH_CHANGED_EVENT_NAME } from '../utils/constant';

const { currentUser, isLoggedIn, loadCurrentUser, logout } = useAuth();

onMounted(() => {
  loadCurrentUser();
  window.addEventListener(AUTH_CHANGED_EVENT_NAME, loadCurrentUser);
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link
        class="navbar-brand fw-bold"
        :to="{ name: ROUTES_MAP.HOME.name }"
      >
        Blog App
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: ROUTES_MAP.HOME.name }"
              >Home</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link
              class="nav-link"
              :to="{ name: ROUTES_MAP.CREATE_POST.name }"
              >Create Post</router-link
            >
          </li>
        </ul>

        <ul class="navbar-nav">
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: ROUTES_MAP.PROFILE.name }"
              >
                <span class="me-1">{{ currentUser?.name }}</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent="logout"> Logout </a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: ROUTES_MAP.LOGIN.name }"
                >Login</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: ROUTES_MAP.REGISTER.name }"
                >Register</router-link
              >
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
