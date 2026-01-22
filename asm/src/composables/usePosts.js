import { ref } from 'vue'
import { setItem } from '../utils/localStorage'
import { POSTS, COMMENTS } from '../utils/constant'
import { getAllComments, getAllPosts } from '../utils/helper'
import _, { find, orderBy, remove } from 'lodash'

const posts = ref([])

export const usePosts = () => {
  const loadPosts = () => {
    const allPosts = getAllPosts()
    posts.value = orderBy(allPosts, ['createdAt'], ['desc'])
  }

  const loadPostById = (id) => {
    const allPosts = getAllPosts()
    return find(allPosts, {id})
  }

  const loadPostsByAuthorId = (authorId) => {
    const allPosts = getAllPosts()
    return _(allPosts)
            .filter(p => p.authorId === authorId)
            .orderBy(['createdAt', ['desc']])
            .value()
  }

  const createPost = (post) => {
    const newPost = {
      id: Date.now(),
      ...post,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    const allPosts = getAllPosts()
    allPosts.push(newPost)
    setItem(POSTS, allPosts)

    return newPost
  }

  const updatePost = (id, updates) => {
    const allPosts = getAllPosts()
    const postIndex = allPosts.findIndex((p) => p.id === parseInt(id))

    if (postIndex === -1) {
      return { error: 'Post not found' }
    }

    allPosts[postIndex] = {
      ...allPosts[postIndex],
      ...updates,
      updatedAt: Date.now()
    }
    setItem(POSTS, allPosts)
  }

  const deletePostById = (id) => {
    id = parseInt(id)
    const allPosts = getAllPosts()
    remove(allPosts, (p) => p.id === id)
    setItem(POSTS, allPosts)

    const allComments = getAllComments()
    remove(allComments, (c) => c.postId === id)
    setItem(COMMENTS, allComments)
  }

  return {
    posts,
    loadPosts,
    loadPostById,
    loadPostsByAuthorId,
    createPost,
    updatePost,
    deletePostById
  }
}
