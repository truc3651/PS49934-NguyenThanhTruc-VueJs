<script setup>
import { ref, onMounted } from 'vue'
import { isEmpty } from 'lodash'
import { useAuth, usePosts, useAlert, useLoading } from '../composables'
import { ITEMS_PER_PAGE, ROUTES_MAP } from '../utils/constant'
import { formatDate } from '../utils/helper'
import { usePagination } from '../composables/usePagination'
import Pagination from '../components/Pagination.vue'

const { currentUser, loadCurrentUser, updateProfile } = useAuth()
const { loadPostsByAuthorId, countPostsByAuthorId } = usePosts()
const { showError, showSuccess } = useAlert()
const {
  currentPage,
  totalCount,
  totalPages,
  pageNumbers,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  setTotalCount
} = usePagination(ITEMS_PER_PAGE)
const { isLoading, withLoading } = useLoading(true)
const { isLoading: isSaving, withLoading: withSaving } = useLoading()

const form = ref(null)
const isEditing = ref(false)
const userPosts = ref([])
const totalPosts = ref(0)

const loadUserData = (page = 1) => withLoading(async () => {
  form.value = {
    name: currentUser.value.name,
    email: currentUser.value.email,
    avatar: currentUser.value.avatar,
    newPassword: '',
    confirmPassword: '',
  }
  const postsData = await loadPostsByAuthorId(currentUser.value.id, page, ITEMS_PER_PAGE)
  if (postsData?.errorMessage) showError(postsData.errorMessage)
  userPosts.value = postsData.data

  const totalPostData = await countPostsByAuthorId(currentUser.value.id)
  if (totalPostData?.errorMessage) showError(totalPostData.errorMessage)
  totalPosts.value = totalPostData.data
  setTotalCount(totalPostData.data)
})

const startEditing = () => {
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
}

const handleSubmit = async () => {
  const {
    name,
    email,
    newPassword,
    confirmPassword,
    avatar
  } = form.value

  if (isEmpty(name)) {
    showError('Name is required')
    return
  }
  if (isEmpty(email)) {
    showError('Email is required')
    return
  }
  if (newPassword && newPassword !== confirmPassword) {
    showError('New passwords do not match')
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

  await withSaving(async () => {
    const result = await updateProfile(updates)

    if (result?.errorMessage) {
      showError(result.errorMessage)
      return
    }

    showSuccess('Profile updated successfully!')
    isEditing.value = false
    form.value.newPassword = ''
    form.value.confirmPassword = ''
  })
}

onMounted(async () => {
  await loadCurrentUser()
  await loadUserData()
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

        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <template v-else>
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

              <div v-if="!isEditing">
                <div class="text-center mb-4">
                  <img
                    :src="currentUser.avatar"
                    class="rounded-circle mb-3"
                    style="width: 120px; height: 120px; object-fit: cover;"
                    alt="Avatar"
                  />
                  <h4>{{ currentUser.name }}</h4>
                  <p class="text-muted">{{ currentUser.email }}</p>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="card bg-light">
                      <div class="card-body text-center">
                        <h5 class="card-title">{{ totalPosts }}</h5>
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
                    :src="form.avatar"
                    class="rounded-circle mb-3"
                    style="width: 120px; height: 120px; object-fit: cover;"
                    alt="Avatar"
                  />
                </div>

                  <div class="mb-3">
                    <label for="avatar" class="form-label">Avatar URL (optional)</label>
                    <input
                      type="url"
                      class="form-control"
                      id="avatar"
                      v-model="form.avatar"
                      :disabled="isSaving"
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
                    :disabled="isSaving"
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
                    :disabled="isSaving"
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
                    :disabled="isSaving"
                  />
                </div>

                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    :disabled="isSaving"
                  />
                </div>

                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="isSaving">
                    <span v-if="isSaving" class="spinner-border spinner-border-sm me-2" role="status"></span>
                    {{ isSaving ? 'Saving...' : 'Save Changes' }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="cancelEditing"
                    :disabled="isSaving"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div v-if="userPosts.length" class="card shadow">
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
                <Pagination
                  :current-page="currentPage"
                  :total-pages="totalPages"
                  :page-numbers="pageNumbers"
                  :total-count="totalCount"
                  item-label="posts"
                  @go-to-page="(page) => goToPage(page, () => loadUserData(page))"
                  @previous="goToPreviousPage(() => loadUserData(currentPage))"
                  @next="goToNextPage(() => loadUserData(currentPage))"
                />
              </div>
              </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
