import { find } from 'lodash';
import { CURRENT_USER, USERS, POSTS, COMMENTS, REACTIONS, FALLBACK_OBJECT, FALLBACK_ARRAY, } from './constant';
import { getItem } from './localStorage';

export const getCurrentUser = () => getItem(CURRENT_USER, FALLBACK_OBJECT);
export const getAllUsers = () => getItem(USERS, FALLBACK_ARRAY);
export const getAllComments = () => getItem(COMMENTS, FALLBACK_ARRAY);
export const getAllPosts = () => getItem(POSTS, FALLBACK_ARRAY);
export const getAllReactions = () => getItem(REACTIONS, FALLBACK_ARRAY);

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString();

export const getAuthorName = (authorId) => {
  const allUsers = getAllUsers();
  const author = find(allUsers, { id: authorId });
  return author?.name || 'Unknown';
};

export const getAuthorById = (authorId) => {
  const allUsers = getAllUsers();
  return find(allUsers, { id: parseInt(authorId) }) || null;
};

export const truncateContent = (content, maxLength = 150) => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
};
