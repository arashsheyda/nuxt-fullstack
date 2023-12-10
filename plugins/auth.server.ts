export default defineNuxtPlugin({
  name: 'mongoose-auth-plugin',
  async setup() {
    await useAuth().me()
  },
})
