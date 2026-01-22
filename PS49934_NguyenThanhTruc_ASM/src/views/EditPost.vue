<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth, usePosts } from '../composables'
import { ROUTES_MAP } from '../utils/constant'
import PostForm from '../components/PostForm.vue'
import { isEmpty } from 'lodash'

const route = useRoute()
const router = useRouter()
const { currentUser } = useAuth()
const { loadPostById, updatePost } = usePosts()

const originalPost = ref(null)
const editablePost = computed(() => ({
  title: originalPost.value?.title ?? '',
  content: originalPost.value?.content ?? '',
  image: originalPost.value?.image ?? ''
}))
const errorMessage = ref('')

const loadPost = () => {
  const post = loadPostById(parseInt(route.params.id))

  if (isEmpty(post)) {
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }
  if (post.authorId !== currentUser.value.id) {
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }

  originalPost.value = post
}

const handleSubmit = (formData) => {
  errorMessage.value = ''
  const {
    title,
    content,
    image
  } = formData

  if (isEmpty(title)) {
    errorMessage.value = 'Title is required'
    return
  }

  if (isEmpty(content)) {
    errorMessage.value = 'Content is required'
    return
  }

  updatePost(originalPost.value.id, {
    title: title.trim(),
    content: content.trim(),
    image
  })
  router.push({ name: ROUTES_MAP.POST_DETAIL.name, params: { id: originalPost.value.id } })
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

        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title mb-4">Edit Post</h2>

            <PostForm
              :initial-data="editablePost"
              :error-message="errorMessage"
              @submit="handleSubmit"
            >
              <template #actions>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary">
                    Save Changes
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
