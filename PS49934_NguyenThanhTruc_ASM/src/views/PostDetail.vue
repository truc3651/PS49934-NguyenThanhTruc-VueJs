<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth, usePosts, useComments, useReactions } from '../composables'
import { ROUTES_MAP, REACTION_TYPES } from '../utils/constant'
import { formatDate, getAuthorName } from '../utils/helper'
import { isEmpty } from 'lodash'

const route = useRoute()
const router = useRouter()

const { currentUser, isLoggedIn } = useAuth()
const { loadPostById, deletePostById } = usePosts()
const { comments, loadCommentsByPostId, addComment } = useComments()
const { getReactionCount, getUserReactionForPost, toggleReaction } = useReactions()

const post = ref(null)
const newComment = ref('')

const getUserReaction = () => {
  if (isLoggedIn.value && post.value)
    return getUserReactionForPost(post.value.id, currentUser.value.id)
}

const handleReaction = (type) => {
  if (isLoggedIn.value && post.value) {
    toggleReaction(post.value.id, currentUser.value.id, type)
    loadPost()
  }
}

const isAuthor = computed(() => {
  return currentUser.value && post.value && post.value.authorId === currentUser.value.id
})

const loadPost = () => {
  const postId = parseInt(route.params?.id ?? -1)
  post.value = loadPostById(postId)
  if (!post.value) {
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }
  loadCommentsByPostId(postId)
}

const submitComment = () => {
  if (isEmpty(newComment.value)) return

  addComment(post.value.id, currentUser.value.id, newComment.value.trim())
  newComment.value = ''
}

const deletePost = () => {
  if (!confirm('Are you sure you want to delete this post?')) return

  deletePostById(post.value.id)
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
              v-if="post.image"
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
                    >{{ getAuthorName(post.authorId) }}</router-link>
                    &bull; {{ formatDate(post.createdAt) }}
                  </small>
                </div>

                <div class="d-flex align-items-center gap-1">
                  <button
                    v-for="(reaction, key) in REACTION_TYPES"
                    :key="key"
                    class="btn btn-sm btn-outline-secondary"
                    :class="{ 'btn-outline-info': getUserReaction()?.type === reaction.type }"
                    :disabled="!isLoggedIn"
                    @click="handleReaction(reaction.type)"
                  >
                    {{ reaction.icon }}
                    <span>{{ getReactionCount(post.id, reaction.type) || '' }}</span>
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

              <div class="card-text" style="white-space: pre-wrap;">{{ post.content }}</div>
            </div>
          </article>

          <section class="mt-4">
            <h4 class="mb-3">Comments ({{ comments.length }})</h4>

            <div v-if="currentUser" class="card mb-4">
              <div class="card-body">
                <form @submit.prevent="submitComment">
                  <div class="mb-3">
                    <textarea
                      class="form-control"
                      rows="3"
                      v-model="newComment"
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

            <div v-if="comments.length === 0" class="alert alert-secondary">
              No comments yet. Be the first to comment!
            </div>

            <div
              v-for="comment in comments"
              :key="comment.id"
              class="card mb-3"
            >
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="card-subtitle mb-0">
                    <router-link
                      :to="{ name: ROUTES_MAP.AUTHOR_PROFILE.name, params: { id: comment.authorId } }"
                      class="text-primary text-decoration-none"
                    >{{ getAuthorName(comment.authorId) }}</router-link>
                  </h6>
                  <small class="text-muted">
                    {{ formatDate(comment.createdAt) }}
                  </small>
                </div>
                <p class="card-text mb-0">{{ comment.content }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
