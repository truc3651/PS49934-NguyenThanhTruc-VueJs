import { isEmpty } from 'lodash'
import { supabase } from '../libs/supabaseClient'
import { DATABASE_CONFIG } from '../utils/constant'
import { getPaginationRange } from '../utils/pagination'
import { Result } from '../dtos/Result'
import { useReactions } from './useReactions'

export const usePosts = () => {
  const { loadReactionsForPost } = useReactions()

  const loadPosts = async (page, itemsPerPage, searchQuery) => {
    const { start, end } = getPaginationRange(page, itemsPerPage);
    let query = supabase
      .from(DATABASE_CONFIG.POSTS.table)
      .select(`
        ${DATABASE_CONFIG.ALL},
        author: ${DATABASE_CONFIG.PROFILES.table}!${DATABASE_CONFIG.POSTS.fields.AUTHOR_ID} (
          ${DATABASE_CONFIG.PROFILES.fields.ID},
          ${DATABASE_CONFIG.PROFILES.fields.NAME}
        )
      `)
      .order(DATABASE_CONFIG.POSTS.fields.CREATED_AT, { ascending: false  })
      .range(start, end)

    if (!isEmpty(searchQuery)) {
      query = query.or(`${DATABASE_CONFIG.POSTS.fields.TITLE}.ilike.%${searchQuery}%`)
    }

    const { data, error } = await query
    const postsDto = await Promise.all(
      data.map(async (p) => ({
          ...toDto(p),
          reactions: (await loadReactionsForPost(p.id))?.data || []
        }))
    )
    console.log('>>>', postsDto[0]);

    return error ? Result.fail(error.message) : Result.ok(postsDto)
  }

  const countPosts = async (searchQuery) => {
    let query = supabase
      .from(DATABASE_CONFIG.POSTS.table)
      .select(DATABASE_CONFIG.POSTS.fields.ID, { count: 'exact', head: true })

    if (!isEmpty(searchQuery)) {
      query = query.or(`${DATABASE_CONFIG.POSTS.fields.TITLE}.ilike.%${searchQuery}%`)
    }

    const { count, error } = await query

    return error ? Result.fail(error.message) : Result.ok(count)
  }

  const loadPostById = async (id) => {
    const { data, error } = await supabase
      .from(DATABASE_CONFIG.POSTS.table)
      .select(`
        ${DATABASE_CONFIG.ALL},
        author: ${DATABASE_CONFIG.PROFILES.table}!${DATABASE_CONFIG.POSTS.fields.AUTHOR_ID} (
          ${DATABASE_CONFIG.PROFILES.fields.ID},
          ${DATABASE_CONFIG.PROFILES.fields.NAME}
        ),
        comments(
          ${DATABASE_CONFIG.ALL},
          user:${DATABASE_CONFIG.PROFILES.table}!${DATABASE_CONFIG.COMMENTS.fields.USER_ID} (
            ${DATABASE_CONFIG.PROFILES.fields.ID},
            ${DATABASE_CONFIG.PROFILES.fields.NAME}
          )
        )
      `)
      .eq(DATABASE_CONFIG.POSTS.fields.ID, parseInt(id))
      .single()

      const postDto = {
        ...toDto(data),
        reactions: (await loadReactionsForPost(data.id))?.data || []
      }

      return error ? Result.fail(error.message) : Result.ok(postDto)
  }

  const loadPostsByAuthorId = async (authorId, page, itemsPerPage) => {
    const { start, end } = getPaginationRange(page, itemsPerPage);

    const { data, error } = await supabase
      .from(DATABASE_CONFIG.POSTS.table)
      .select(`
        ${DATABASE_CONFIG.ALL},
        author: ${DATABASE_CONFIG.PROFILES.table}!${DATABASE_CONFIG.POSTS.fields.AUTHOR_ID} (
          ${DATABASE_CONFIG.PROFILES.fields.ID},
          ${DATABASE_CONFIG.PROFILES.fields.NAME}
        )
      `)
      .eq(DATABASE_CONFIG.POSTS.fields.AUTHOR_ID, parseInt(authorId))
      .order(DATABASE_CONFIG.POSTS.fields.CREATED_AT, { ascending: false  })
      .range(start, end)

    const postsDto = await Promise.all(
      data.map(async (p) => ({
          ...toDto(p),
          reactions: (await loadReactionsForPost(p.id))?.data || []
        }))
    )

    return error ? Result.fail(error.message) : Result.ok(postsDto)
  }

  const countPostsByAuthorId = async (authorId) => {
    const { count, error } = await supabase
      .from(DATABASE_CONFIG.POSTS.table)
      .select(DATABASE_CONFIG.POSTS.fields.ID, { count: 'exact', head: true })
      .eq(DATABASE_CONFIG.POSTS.fields.AUTHOR_ID, parseInt(authorId))

    return error ? Result.fail(error.message) : Result.ok(count)
  }

  const createPost = async (post) => {
    const { error, data } = await supabase
      .from(DATABASE_CONFIG.POSTS.table)
      .insert({
        title: post.title,
        content: post.content,
        image: post.image,
        author_id: post.authorId
      })
      .select()
      .single()

    return error ? Result.fail(error.message) : Result.ok(toDto(data))
  }

  const updatePost = async (id, updates) => {
    const updateData = {}
    if (!isEmpty(updates.title)) updateData.title = updates.title
    if (!isEmpty(updates.content)) updateData.content = updates.content
    if (!isEmpty(updates.image)) updateData.image = updates.image

    if (isEmpty(updateData)) {
      return { post: null }
    }
    
    updateData.updated_at = new Date().toISOString()
    const { error } = await supabase
      .from(DATABASE_CONFIG.POSTS.table)
      .update(updateData)
      .eq(DATABASE_CONFIG.POSTS.fields.ID, parseInt(id))
      .select()
      .single()

    if(error) {
      return Result.fail(error.message)
    }
  }

  const deletePostById = async (id) => {
    const postId = parseInt(id)

    await supabase
      .from(DATABASE_CONFIG.REACTIONS.table)
      .delete()
      .eq(DATABASE_CONFIG.REACTIONS.fields.POST_ID, postId)

    await supabase
      .from(DATABASE_CONFIG.COMMENTS.table)
      .delete()
      .eq(DATABASE_CONFIG.COMMENTS.fields.POST_ID, postId)

    const { error } = await supabase
      .from(DATABASE_CONFIG.POSTS.table)
      .delete()
      .eq(DATABASE_CONFIG.POSTS.fields.ID, postId)

    if(error) {
      return Result.fail(error.message)
    }
  }

  const toDto = (post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    image: post.image,
    authorId: post.author_id,
    createdAt: new Date(post.created_at).getTime(),
    updatedAt: post.updated_at ? new Date(post.updated_at).getTime() : null,
    author: post.author ? toUserDto(post.author) : null,
    comments: post.comments ? toCommentsDto(post.comments) : []
  })

  const toCommentsDto = (comments) => comments.map(comment => ({
    id: comment.id,
    parentId: comment.parent_id,
    content: comment.content,
    createdAt: new Date(comment.created_at).getTime(),
    user: toUserDto(comment.user)
  }))

  const toUserDto = (user) => ({
    id: user.id,
    name: user.name
  })

  return {
    loadPosts,
    countPosts,
    loadPostById,
    loadPostsByAuthorId,
    countPostsByAuthorId,
    createPost,
    updatePost,
    deletePostById
  }
}
