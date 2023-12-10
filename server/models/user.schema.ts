import { defineMongooseModel } from '#nuxt/mongoose'

// import { hash } from 'bcrypt'

export const UserSchema = defineMongooseModel({
  name: 'User',
  schema: {
    email: {
      type: 'string',
      unique: true,
    },
    password: {
      type: 'string',
    },
  },
  hooks(schema) {
    schema.pre('save', function (this, next) {
      // TODO: better validation
      if (this.password && this.email)
        next()

      throw createError({
        statusCode: 500,
        statusMessage: 'validation failed',
      })
      // this.password = Math.random().toString() as any

      // bcrypt.genSalt(10, function(err, salt) {
      //     if (err) return next(err);

      //     bcrypt.hash(user.password, salt, function(err, hash) {
      //         if (err) return next(err);
      //         user.password = hash;
      //         next();
      //     })
      // })
    })
  },
})
