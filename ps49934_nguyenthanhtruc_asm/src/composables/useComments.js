import { Result } from '../dtos/Result'
import { supabase } from '../libs/supabaseClient'
import { DATABASE_CONFIG } from '../utils/constant'

export const useComments = () => {
  const addComment = async (postId, userId, content, parentId) => {
    const insertData = {
      post_id: parseInt(postId),
      user_id: userId,
      content
    }
    if (parentId) {
      insertData.parent_id = parseInt(parentId)
    }

    const { _, error } = await supabase
      .from(DATABASE_CONFIG.COMMENTS.table)
      .insert(insertData)
      .select(`
        ${DATABASE_CONFIG.ALL},
        user:${DATABASE_CONFIG.PROFILES.table}!${DATABASE_CONFIG.COMMENTS.fields.USER_ID} (
          ${DATABASE_CONFIG.PROFILES.fields.ID},
          ${DATABASE_CONFIG.PROFILES.fields.NAME}
        )
      `)
      .single()

    if(error) {
      return Result.fail(error.message)
    }
  }

  return {
    addComment
  }
}
