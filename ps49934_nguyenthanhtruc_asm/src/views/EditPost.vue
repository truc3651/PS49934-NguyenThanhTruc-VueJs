<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth, usePosts, useAlert, useLoading } from '../composables'
import { ROUTES_MAP } from '../utils/constant'
import PostForm from '../components/PostForm.vue'
import { isEmpty } from 'lodash'

const route = useRoute()
const router = useRouter()
const { currentUser } = useAuth()
const { loadPostById, updatePost } = usePosts()
const { showError, showSuccess } = useAlert()
const { isLoading, withLoading } = useLoading(true)
const { isLoading: isSaving, withLoading: withSaving } = useLoading()

const originalPost = ref(null)
const editablePost = computed(() => ({
  title: originalPost.value?.title ?? '',
  content: originalPost.value?.content ?? '',
  image: originalPost.value?.image ?? ''
}))

const loadPost = () => withLoading(async () => {
  const result = await loadPostById(route.params?.id)
  if (result.errorMessage) {
    showError(result.errorMessage)
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }
  if (isEmpty(result.data) || result.data.authorId !== currentUser.value.id) {
    showError('Post not found or unauthorized')
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }
  originalPost.value = result.data
})

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

  await withSaving(async () => {
    const result = await updatePost(originalPost.value.id, {
      title: title.trim(),
      content: content.trim(),
      image
    })

    if (result?.errorMessage) {
      showError(result.errorMessage)
      return
    }
    showSuccess('Post updated successfully')
    router.push({ name: ROUTES_MAP.POST_DETAIL.name, params: { id: originalPost.value.id } })
  })
}

onMounted(() => {
  loadPost()
})
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="mb-3">
          <router-link
            :to="{ name: ROUTES_MAP.POST_DETAIL.name, params: { id: route.params.id } }"
            class="btn btn-outline-secondary btn-sm"
          >
            &larr; Back to Post
          </router-link>
        </div>

        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title mb-4">Edit Post</h2>

            <PostForm
              :initial-data="editablePost"
              :is-loading="isSaving"
              @submit="handleSubmit"
            >
              <template #actions>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="isSaving">
                    <span v-if="isSaving" class="spinner-border spinner-border-sm me-2" role="status"></span>
                    {{ isSaving ? 'Saving...' : 'Save Changes' }}
                  </button>
                  <router-link
                    :to="{ name: ROUTES_MAP.POST_DETAIL.name, params: { id: route.params.id } }"
                    class="btn btn-outline-secondary"
                  >
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
