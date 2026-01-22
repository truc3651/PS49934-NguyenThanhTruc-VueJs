import { ref } from 'vue'
import { setItem } from '../utils/localStorage'
import { COMMENTS } from '../utils/constant'
import { getAllComments } from '../utils/helper'
import _ from 'lodash'

const comments = ref([])

export const useComments = () => {
  const loadCommentsByPostId = (postId) => {
    const allComments = getAllComments()
    comments.value = _(allComments)
        .filter(c => c.postId === postId)
        .orderBy(['createdAt', ['desc']])
        .value()
  }

  const addComment = (postId, authorId, content) => {
    const newComment = {
      id: Date.now(),
      postId: parseInt(postId),
      authorId,
      content,
      createdAt: Date.now(),
    }

    const allComments = getAllComments()
    allComments.push(newComment)
    setItem(COMMENTS, allComments)

    comments.value.unshift(newComment)
    return newComment
  }

  return {
    comments,
    loadCommentsByPostId,
    addComment
  }
}
