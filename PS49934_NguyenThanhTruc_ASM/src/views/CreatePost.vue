<script setup>
import { useRouter } from 'vue-router'
import { useAuth, usePosts, useAlert, useLoading } from '../composables'
import { ROUTES_MAP } from '../utils/constant'
import PostForm from '../components/PostForm.vue'
import { isEmpty } from 'lodash'

const router = useRouter()
const { currentUser } = useAuth()
const { createPost } = usePosts()
const { showError, showSuccess } = useAlert()
const { isLoading, withLoading } = useLoading()

const handleSubmit = async (formData) => {
  const { title, content, image } = formData

  if (isEmpty(title)) {
    showError('Title is required')
    return
  }
  if (isEmpty(content)) {
    showError('Content is required')
    return
  }
  if (isEmpty(image)) {
    showError('Image is required')
    return
  }

  await withLoading(async () => {
    const result = await createPost({
      title: title.trim(),
      content: content.trim(),
      image: image,
      authorId: currentUser.value.id
    })

    if (result?.errorMessage) {
      showError(result.errorMessage)
      return
    }

    showSuccess('Post created successfully')
    router.push({ name: ROUTES_MAP.POST_DETAIL.name, params: { id: result.data.id } })
  })
}
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

        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title mb-4">Create New Post</h2>

            <PostForm
              :is-loading="isLoading"
              submit-label="Create Post"
              @submit="handleSubmit"
            >
              <template #actions>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                    {{ isLoading ? 'Creating...' : 'Create Post' }}
                  </button>
                  <router-link :to="{ name: ROUTES_MAP.HOME.name }" class="btn btn-outline-secondary">
                    Cancel
                  </router-link>
                </div>
              </template>
            </PostForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
