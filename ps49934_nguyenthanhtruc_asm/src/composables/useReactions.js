import { Result } from '../dtos/Result'
import { supabase } from '../libs/supabaseClient'
import { DATABASE_CONFIG, REACTION_TYPES } from '../utils/constant'

export const useReactions = () => {
  const loadReactionsForPost = async (postId) => {
    const { data, error } = await supabase
      .from(DATABASE_CONFIG.REACTIONS.table)
      .select(DATABASE_CONFIG.REACTIONS.fields.TYPE)
      .eq(DATABASE_CONFIG.REACTIONS.fields.POST_ID, parseInt(postId))

    return error ? Result.fail(error.message) : Result.ok(toDto(data))
  }

  const getUserReactionForPost = async (postId, userId) => {
    const { data, error } = await supabase
      .from(DATABASE_CONFIG.REACTIONS.table)
      .select(DATABASE_CONFIG.REACTIONS.fields.TYPE)
      .eq(DATABASE_CONFIG.REACTIONS.fields.POST_ID, parseInt(postId))
      .eq(DATABASE_CONFIG.REACTIONS.fields.USER_ID, userId)
      .limit(1)

    return error ? Result.fail(error.message) : Result.ok(data?.[0])
  }

  const toggleReaction = async (postId, userId, type) => {
    const existingReaction = await getUserReactionForPost(postId, userId)

    if (existingReaction?.data?.type === type) {
      return removeReaction(postId, userId)
    }

    if (existingReaction?.data?.type) {
      const { error } = await supabase
        .from(DATABASE_CONFIG.REACTIONS.table)
        .update({ type })
        .eq(DATABASE_CONFIG.REACTIONS.fields.POST_ID, parseInt(postId))
        .eq(DATABASE_CONFIG.REACTIONS.fields.USER_ID, userId)

      return error ? Result.fail(error.message) : Result.ok()
    }

    const { error } = await supabase
      .from(DATABASE_CONFIG.REACTIONS.table)
      .insert({
        post_id: parseInt(postId),
        user_id: userId,
        type
      })

    if (error) {
      return Result.fail(error.message)
    }
  }

  const removeReaction = async (postId, userId) => {
    const { error } = await supabase
      .from(DATABASE_CONFIG.REACTIONS.table)
      .delete()
      .eq(DATABASE_CONFIG.REACTIONS.fields.POST_ID, parseInt(postId))
      .eq(DATABASE_CONFIG.REACTIONS.fields.USER_ID, userId)

    if (error) {
      return Result.fail(error.message)
    }
  }

  const countReactionsByAuthorId = async (authorId) => {
    const { count, error } = await supabase
      .from(DATABASE_CONFIG.REACTIONS.table)
      .select(`
        ${DATABASE_CONFIG.REACTIONS.fields.ID},
        ${DATABASE_CONFIG.POSTS.table}!inner(${DATABASE_CONFIG.POSTS.fields.AUTHOR_ID})
      `, { count: 'exact', head: true })
      .eq(`${DATABASE_CONFIG.POSTS.table}.${DATABASE_CONFIG.POSTS.fields.AUTHOR_ID}`, parseInt(authorId))

    return error ? Result.fail(error.message) : Result.ok(count)
  }

  const toDto = (reactions) => ({
    [REACTION_TYPES.LIKE.type]: reactions.filter(c => c.type === REACTION_TYPES.LIKE.type)?.length || 0,
    [REACTION_TYPES.LOVE.type]: reactions.filter(c => c.type === REACTION_TYPES.LOVE.type)?.length || 0,
    [REACTION_TYPES.HAHA.type]: reactions.filter(c => c.type === REACTION_TYPES.HAHA.type)?.length || 0,
    [REACTION_TYPES.WOW.type]: reactions.filter(c => c.type === REACTION_TYPES.WOW.type)?.length || 0,
    [REACTION_TYPES.SAD.type]: reactions.filter(c => c.type === REACTION_TYPES.SAD.type)?.length || 0,
    [REACTION_TYPES.ANGRY.type]: reactions.filter(c => c.type === REACTION_TYPES.ANGRY.type)?.length || 0,
  })

  return {
    loadReactionsForPost,
    getUserReactionForPost,
    toggleReaction,
    countReactionsByAuthorId
  }
}
