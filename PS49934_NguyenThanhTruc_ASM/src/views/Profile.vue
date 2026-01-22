<script setup>
import { ref, onMounted } from 'vue'
import { useAuth, usePosts } from '../composables'
import { ROUTES_MAP } from '../utils/constant'
import { formatDate } from '../utils/helper'
import { isEmpty } from 'lodash'

const { currentUser, loadCurrentUser, updateProfile } = useAuth()
const { loadPostsByAuthorId } = usePosts()

const form = ref(null)
const isEditing = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const userPosts = ref([])

const loadUserData = () => {
  form.value = {
    name: currentUser.value.name,
    email: currentUser.value.email,
    avatar: currentUser.value.avatar,
    newPassword: '',
    confirmPassword: '',
  }
  userPosts.value = loadPostsByAuthorId(currentUser.value.id)
}

const startEditing = () => {
  isEditing.value = true
  errorMessage.value = ''
  successMessage.value = ''
}

const cancelEditing = () => {
  isEditing.value = false
  loadUserData()
  errorMessage.value = ''
  successMessage.value = ''
}

const handleSubmit = () => {
  errorMessage.value = ''
  successMessage.value = ''
  const {
    name,
    email,
    newPassword,
    confirmPassword,
    avatar
  } = form.value

  if (isEmpty(name)) {
    errorMessage.value = 'Name is required'
    return
  }
  if (isEmpty(email)) {
    errorMessage.value = 'Email is required'
    return
  }
  if (newPassword && newPassword !== confirmPassword) {
      errorMessage.value = 'New passwords do not match'
      return
  }

  const updates = {
    name: name.trim(),
    email: email.trim(),
    avatar
  }
  if (newPassword) {
    updates.password = newPassword
  }
  const result = updateProfile(updates)
  if (result.error) {
    errorMessage.value = result.error
    return
  }

  successMessage.value = 'Profile updated successfully!'
  isEditing.value = false
  form.value.newPassword = ''
  form.value.confirmPassword = ''
}

onMounted(() => {
  loadCurrentUser()
  loadUserData()
})
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="mb-3">
          <router-link :to="{ name: ROUTES_MAP.HOME.name }" class="btn btn-outline-secondary btn-sm">
            &larr; Back to Home
          </router-link>
        </div>

        <div class="card shadow mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="card-title mb-0">My Profile</h2>
              <button
                v-if="!isEditing"
                @click="startEditing"
                class="btn btn-outline-primary"
              >
                Edit Profile
              </button>
            </div>

            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="alert alert-success" role="alert">
              {{ successMessage }}
            </div>

            <div v-if="!isEditing">
              <div class="text-center mb-4">
                <img
                  v-if="currentUser.avatar"
                  :src="currentUser.avatar"
                  class="rounded-circle mb-3"
                  style="width: 120px; height: 120px; object-fit: cover;"
                  alt="Avatar"
                />
                <div
                  v-else
                  class="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                  style="width: 120px; height: 120px;"
                >
                  <span class="text-white fs-1">
                    {{ currentUser.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <h4>{{ currentUser.name }}</h4>
                <p class="text-muted">{{ currentUser.email }}</p>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="card bg-light">
                    <div class="card-body text-center">
                      <h5 class="card-title">{{ userPosts.length }}</h5>
                      <p class="card-text text-muted mb-0">Posts</p>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card bg-light">
                    <div class="card-body text-center">
                      <h5 class="card-title">
                        {{ formatDate(currentUser.createdAt) }}
                      </h5>
                      <p class="card-text text-muted mb-0">Member Since</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form v-else @submit.prevent="handleSubmit">
              <div class="text-center mb-4">
                <img
                  v-if="form.avatar"
                  :src="form.avatar"
                  class="rounded-circle mb-3"
                  style="width: 120px; height: 120px; object-fit: cover;"
                  alt="Avatar"
                />
                <div
                  v-else
                  class="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                  style="width: 120px; height: 120px;"
                >
                  <span class="text-white fs-1">
                    {{ form.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </div>

                <div class="mb-3">
                  <label for="avatar" class="form-label">Avatar URL (optional)</label>
                  <input
                    type="url"
                    class="form-control"
                    id="avatar"
                    v-model="form.avatar"
                  />
                </div>

              <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.name"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  required
                />
              </div>

              <hr class="my-4" />

              <h5 class="mb-3">Change Password (optional)</h5>

              <div class="mb-3">
                <label for="newPassword" class="form-label">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  v-model="form.newPassword"
                />
              </div>

              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm New Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                />
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="cancelEditing"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <div v-if="!isEditing && userPosts.length" class="card shadow">
          <div class="card-body">
            <h4 class="card-title mb-3">My Posts</h4>

            <div class="list-group list-group-flush">
              <router-link
                v-for="post in userPosts"
                :key="post.id"
                :to="{ name: ROUTES_MAP.POST_DETAIL.name, params: { id: post.id } }"
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 class="mb-1">{{ post.title }}</h6>
                  <small class="text-muted">{{ formatDate(post.createdAt) }}</small>
                </div>
                <span class="badge bg-primary rounded-pill">&rarr;</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
