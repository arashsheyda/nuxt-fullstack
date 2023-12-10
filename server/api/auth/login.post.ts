import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const errorMessage = 'email or password is wrong! please try again later'

export default defineEventHandler(async (event) => {
  // TODO: use validation
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusMessage: 'required field',
    })
  }

  const user = await mongoose.connection.db.collection('users').findOne({ email })

  if (!user) {
    throw createError({
      statusMessage: errorMessage,
    })
  }

  const matches = bcrypt.compareSync(password, user.password)

  if (!matches) {
    throw createError({
      statusMessage: errorMessage,
    })
  }

  await setAuth(event, user.email)

  return {
    loggedIn: true,
    user: user.email as string,
  }
})
