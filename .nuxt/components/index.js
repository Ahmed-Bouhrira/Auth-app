export { default as ChatForm } from '../..\\components\\ChatForm.vue'
export { default as Message } from '../..\\components\\Message.vue'
export { default as Snackbar } from '../..\\components\\Snackbar.vue'

export const LazyChatForm = import('../..\\components\\ChatForm.vue' /* webpackChunkName: "components_ChatForm" */).then(c => c.default || c)
export const LazyMessage = import('../..\\components\\Message.vue' /* webpackChunkName: "components_Message" */).then(c => c.default || c)
export const LazySnackbar = import('../..\\components\\Snackbar.vue' /* webpackChunkName: "components_Snackbar" */).then(c => c.default || c)
