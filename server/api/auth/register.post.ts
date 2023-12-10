import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  // TODO: use validation
  const { email, password, ...rest } = await readBody(event)

  const hashed = bcrypt.hashSync(password, 10)

  try {
    await mongoose.connection.db.collection('users').insertOne({ email, password: hashed, ...rest })
  } catch (error) {
    throw createError({
      statusMessage: 'user already registered.',
    })
  }

  await setAuth(event, email)

  return {
    registered: true,
    user: email as string,
  }
})