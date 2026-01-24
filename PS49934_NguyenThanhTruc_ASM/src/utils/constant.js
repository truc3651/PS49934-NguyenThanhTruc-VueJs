import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PostDetail from '../views/PostDetail.vue'
import CreatePost from '../views/CreatePost.vue'
import EditPost from '../views/EditPost.vue'
import Profile from '../views/Profile.vue'
import AuthorProfile from '../views/AuthorProfile.vue'

export const ROUTES_MAP = Object.freeze({
  HOME: {
    path: '/',
    name: 'Home',
  },
  LOGIN: {
    path: '/login',
    name: 'Login'
  },
  REGISTER: {
    path: '/register',
    name: 'Register',
  },
  POST_DETAIL: {
    path: '/post/:id',
    name: 'PostDetail',
  },
  CREATE_POST: {
    path: '/create-post',
    name: 'CreatePost',
  },
  EDIT_POST: {
    path: '/edit-post/:id',
    name: 'EditPost',
  },
  PROFILE: {
    path: '/profile',
    name: 'Profile'
  },
  AUTHOR_PROFILE: {
    path: '/author/:id',
    name: 'AuthorProfile'
  }
})

export const ROUTES = Object.freeze([
  {
    path: ROUTES_MAP.HOME.path,
    name: ROUTES_MAP.HOME.name,
    component: Home
  },
  {
    path: ROUTES_MAP.LOGIN.path,
    name: ROUTES_MAP.LOGIN.name,
    component: Login
  },
  {
    path: ROUTES_MAP.REGISTER.path,
    name: ROUTES_MAP.REGISTER.name,
    component: Register
  },
  {
    path: ROUTES_MAP.POST_DETAIL.path,
    name: ROUTES_MAP.POST_DETAIL.name,
    component: PostDetail
  },
  {
    path: ROUTES_MAP.CREATE_POST.path,
    name: ROUTES_MAP.CREATE_POST.name,
    component: CreatePost,
    meta: { requiresAuth: true }
  },
  {
    path: ROUTES_MAP.EDIT_POST.path,
    name: ROUTES_MAP.EDIT_POST.name,
    component: EditPost,
    meta: { requiresAuth: true }
  },
  {
    path: ROUTES_MAP.PROFILE.path,
    name: ROUTES_MAP.PROFILE.name,
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: ROUTES_MAP.AUTHOR_PROFILE.path,
    name: ROUTES_MAP.AUTHOR_PROFILE.name,
    component: AuthorProfile
  }
])

export const CURRENT_USER = 'currentUser'
export const USERS = 'users'
export const POSTS = 'posts'
export const COMMENTS = 'comments'
export const REACTIONS = 'reactions'
export const AUTH_CHANGED_EVENT_NAME = 'auth-changed'

export const REACTION_TYPES = Object.freeze({
  LIKE: { type: 'like', icon: '👍' },
  LOVE: { type: 'love', icon: '❤️' },
  HAHA: { type: 'haha', icon: '😂' },
  WOW: { type: 'wow', icon: '😮' },
  SAD: { type: 'sad', icon: '😢'},
  ANGRY: { type: 'angry', icon: '😠' }
})

export const FALLBACK_OBJECT = '{}'
export const FALLBACK_ARRAY = '[]'