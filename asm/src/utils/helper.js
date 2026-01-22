import { find } from 'lodash';
import { CURRENT_USER, USERS, POSTS, COMMENTS, FALLBACK_OBJECT, FALLBACK_ARRAY, } from '../utils/constant';
import { getItem } from '../utils/localStorage';

export const getCurrentUser = () => getItem(CURRENT_USER, FALLBACK_OBJECT);
export const getAllUsers = () => getItem(USERS, FALLBACK_ARRAY);
export const getAllComments = () => getItem(COMMENTS, FALLBACK_ARRAY);
export const getAllPosts = () => getItem(POSTS, FALLBACK_ARRAY);

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString();

export const getAuthorName = (authorId) => {
  const allUsers = getAllUsers();
  const author = find(allUsers, { id: authorId });
  return author?.name || 'Unknown';
};

export const truncateContent = (content, maxLength = 150) => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
};
