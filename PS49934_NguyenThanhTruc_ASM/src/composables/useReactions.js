import { ref } from 'vue'
import { setItem } from '../utils/localStorage'
import { REACTIONS } from '../utils/constant'
import { getAllReactions } from '../utils/helper'
import { filter, find, countBy, remove } from 'lodash'

const reactions = ref([])

export const useReactions = () => {
  const loadReactionsByPostId = (postId) => {
    const allReactions = getAllReactions()
    reactions.value = filter(allReactions, { postId })
  }

  const getReactionCountsByPostId = (postId) => {
    const allReactions = getAllReactions()
    const postReactions = filter(allReactions, { postId })
    return countBy(postReactions, 'type')
  }

  const getTotalReactionCountsByPostId = (postId) => {
    const allReactions = getAllReactions()
    return filter(allReactions, { postId }).length
  }

  const getReactionCount = (postId, type) => {
    const counts = getReactionCountsByPostId(postId)
    return counts[type] || 0
  }

  const getUserReactionForPost = (postId, userId) => {
    const allReactions = getAllReactions()
    return find(allReactions, {
      postId,
      userId
    })
  }

  const toggleReaction = (postId, userId, type) => {
    const allReactions = getAllReactions()
    const existingReaction = find(allReactions, { postId, userId })

    if (existingReaction?.type === type) 
      return removeReaction(postId, userId)

    if(existingReaction) {
      existingReaction.type = type
      existingReaction.updatedAt = Date.now()
      setItem(REACTIONS, allReactions)
      return getReactionCountsByPostId(postId)
    }

    allReactions.push({
      id: Date.now(),
      postId,
      userId,
      type,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    setItem(REACTIONS, allReactions)
    return getReactionCountsByPostId(postId)
  }

  const removeReaction = (postId, userId) => {
    const allReactions = getAllReactions()
    remove(allReactions, { postId, userId })
    setItem(REACTIONS, allReactions)
    return getReactionCountsByPostId(postId)
  }

  return {
    reactions,
    loadReactionsByPostId,
    getReactionCountsByPostId,
    getTotalReactionCountsByPostId,
    getReactionCount,
    getUserReactionForPost,
    toggleReaction,
    removeReaction
  }
}
