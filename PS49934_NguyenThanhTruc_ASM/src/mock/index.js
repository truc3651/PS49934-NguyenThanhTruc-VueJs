import { mockUsers } from './users'
import { mockPosts } from './posts'
import { setItem, getItem } from '../utils/localStorage'
import { USERS, POSTS, REACTIONS, COMMENTS } from '../utils/constant'
import { isEmpty } from 'lodash'

export const init = () => {
  const existingUsers = getItem(USERS)
  const existingPosts = getItem(POSTS)
  const existingReactions = getItem(REACTIONS)
  const existingComments = getItem(COMMENTS)

  if (isEmpty(existingUsers)) setItem(USERS, mockUsers)

  if (isEmpty(existingPosts)) setItem(POSTS, mockPosts)

  if (isEmpty(existingReactions)) setItem(REACTIONS, [])

  if (isEmpty(existingComments)) setItem(COMMENTS, [])
}
