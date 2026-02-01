<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth, usePosts, useComments, useReactions, useAlert, useLoading } from '../composables'
import { ROUTES_MAP, REACTION_TYPES } from '../utils/constant'
import { formatDate } from '../utils/helper'

const route = useRoute()
const router = useRouter()

const { currentUser, isLoggedIn } = useAuth()
const { loadPostById, deletePostById } = usePosts()
const { addComment } = useComments()
const { getUserReactionForPost, toggleReaction } = useReactions()
const { showError, showSuccess } = useAlert()
const { isLoading, withLoading } = useLoading(true)

const post = ref(null)
const userReaction = ref(null)
const newComment = ref('')
const replyingTo = ref(null)
const replyContent = ref('')

const isAuthor = computed(() => {
  return currentUser.value && post.value.authorId === currentUser.value.id
})

const parentComments = computed(() => {
  if (!post.value?.comments) return []
  return post.value.comments.filter(c => !c.parentId)
})

const getChildComments = (parentId) => {
  if (!post.value?.comments) return []
  return post.value.comments.filter(c => c.parentId === parentId)
}

const totalCommentsCount = computed(() => {
  return post.value?.comments?.length || 0
})

const loadPost = () => withLoading(async () => {
  const postId = route.params?.id
  const result = await loadPostById(postId)

  if (result.errorMessage) {
    showError(result.errorMessage)
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }
  if (!result.data) {
    showError('Post not found')
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }
  post.value = result.data

  if (!isLoggedIn.value) return

  const userReactionResult = await getUserReactionForPost(post.value.id, currentUser.value?.id)
  if (userReactionResult?.errorMessage) showError(userReactionResult.errorMessage)
  userReaction.value = userReactionResult.data
})

const handleReaction = async (type) => {
  if (!isLoggedIn.value) return

  const toggleResult = await toggleReaction(post.value.id, currentUser.value.id, type)
  if (toggleResult?.errorMessage) {
    showError(toggleResult.errorMessage)
    return
  }
  loadPost()
}

const submitComment = async () => {
  if (newComment.value) {
    const addResult = await addComment(post.value.id, currentUser.value.id, newComment.value.trim())
    if (addResult?.errorMessage) {
      showError(addResult.errorMessage)
      return
    }
    newComment.value = ''
    loadPost()
  }
}

const startReply = (commentId) => {
  replyingTo.value = commentId
  replyContent.value = ''
}

const cancelReply = () => {
  replyingTo.value = null
  replyContent.value = ''
}

const submitReply = async (parentId) => {
  if (replyContent.value) {
    const addResult = await addComment(post.value.id, currentUser.value.id, replyContent.value.trim(), parentId)
    if (addResult?.errorMessage) {
      showError(addResult.errorMessage)
      return
    }
    cancelReply()
    loadPost()
  }
}

const deletePost = async () => {
  if (!confirm('Are you sure you want to delete this post?')) return

  const result = await deletePostById(post.value.id)
  if (result?.errorMessage) {
    showError(result.errorMessage)
    return
  }
  showSuccess('Post deleted successfully')
  router.push({ name: ROUTES_MAP.HOME.name })
}

onMounted(() => {
  loadPost()
})
</script>

<template>
  <div class="container mt-4">
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="post">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="mb-3">
            <router-link :to="{ name: ROUTES_MAP.HOME.name }" class="btn btn-outline-secondary btn-sm">
              &larr; Back to Home
            </router-link>
          </div>

          <article class="card shadow">
            <img
              :src="post.image"
              class="card-img-top"
              :alt="post.title"
              style="max-height: 400px; object-fit: cover;"
            />

            <div class="card-body">
              <h1 class="card-title">{{ post.title }}</h1>

              <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div class="text-muted">
                  <small>
                    By <router-link
                      :to="{ name: ROUTES_MAP.AUTHOR_PROFILE.name, params: { id: post.authorId } }"
                      class="text-decoration-none fw-bold"
                    >{{ post.author.name }}</router-link>
                    &bull; {{ formatDate(post.createdAt) }}
                  </small>
                </div>

                <div class="d-flex align-items-center gap-1">
                  <button
                    v-for="(reaction, key) in REACTION_TYPES"
                    :key="key"
                    class="btn btn-sm btn-outline-secondary"
                    :class="{ 'btn-secondary': userReaction?.type === reaction.type }"
                    :disabled="!isLoggedIn"
                    @click="handleReaction(reaction.type)"
                  >
                    {{ reaction.icon }}
                    <span :class="{ 'text-white': userReaction?.type === reaction.type }">{{ post.reactions[reaction.type] }}</span>
                  </button>
                </div>

                <div v-if="isAuthor">
                  <router-link
                    :to="{ name: ROUTES_MAP.EDIT_POST.name, params: { id: post.id } }"
                    class="btn btn-outline-primary btn-sm me-2"
                  >
                    Edit
                  </router-link>
                  <button
                    @click="deletePost"
                    class="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <hr />

              <div class="card-text post-content" v-html="post.content"></div>
            </div>
          </article>

          <section class="mt-4">
            <h4 class="mb-3">Comments ({{ totalCommentsCount }})</h4>

            <div v-if="currentUser" class="card mb-4">
              <div class="card-body">
                <form @submit.prevent="submitComment">
                  <div class="mb-3">
                    <textarea
                      class="form-control"
                      rows="3"
                      v-model="newComment"
                      placeholder="Write a comment..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Post Comment
                  </button>
                </form>
              </div>
            </div>

            <div v-else class="alert alert-info mb-4">
              Please
              <router-link :to="{ name: ROUTES_MAP.LOGIN.name }" class="alert-link">login</router-link>
              to leave a comment.
            </div>

            <div v-if="isLoggedIn && parentComments.length === 0" class="alert alert-secondary">
              No comments yet. Be the first to comment!
            </div>

            <div
              v-for="comment in parentComments"
              :key="comment.id"
              class="card mb-3"
            >
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="card-subtitle mb-0">
                    <router-link
                      :to="{ name: ROUTES_MAP.AUTHOR_PROFILE.name, params: { id: comment.user.id } }"
                      class="text-primary text-decoration-none"
                    >{{ comment.user.name }}</router-link>
                  </h6>
                  <small class="text-muted">
                    {{ formatDate(comment.createdAt) }}
                  </small>
                </div>
                <p class="card-text mb-2">{{ comment.content }}</p>

                <button
                  v-if="currentUser"
                  class="btn btn-link btn-sm p-0 text-muted"
                  @click="startReply(comment.id)"
                >
                  Reply
                </button>

                <div v-if="replyingTo === comment.id" class="mt-3">
                  <form @submit.prevent="submitReply(comment.id)">
                    <div class="mb-2">
                      <textarea
                        class="form-control form-control-sm"
                        rows="2"
                        v-model="replyContent"
                        placeholder="Write a reply..."
                        required
                      ></textarea>
                    </div>
                    <div class="d-flex gap-2">
                      <button type="submit" class="btn btn-primary btn-sm">
                        Reply
                      </button>
                      <button type="button" class="btn btn-outline-secondary btn-sm" @click="cancelReply">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                <div v-if="getChildComments(comment.id).length > 0" class="mt-3 ms-4 border-start ps-3">
                  <div
                    v-for="reply in getChildComments(comment.id)"
                    :key="reply.id"
                    class="mb-3"
                  >
                    <div class="d-flex justify-content-between align-items-start mb-1">
                      <h6 class="card-subtitle mb-0 small">
                        <router-link
                          :to="{ name: ROUTES_MAP.AUTHOR_PROFILE.name, params: { id: reply.user.id } }"
                          class="text-primary text-decoration-none"
                        >{{ reply.user.name }}</router-link>
                      </h6>
                      <small class="text-muted" style="font-size: 0.75rem;">
                        {{ formatDate(reply.createdAt) }}
                      </small>
                    </div>
                    <p class="card-text mb-0 small">{{ reply.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.post-content :deep(p) {
  margin-bottom: 1rem;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.post-content :deep(blockquote) {
  border-left: 4px solid #dee2e6;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #6c757d;
}

.post-content :deep(pre) {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
}

.post-content :deep(code) {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
}

.post-content :deep(a) {
  color: #0d6efd;
}
</style>
