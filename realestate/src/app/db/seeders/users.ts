import { Payload } from 'payload'

export const seedUsers = async (payload: Payload) => {
  await payload.create({
    collection: 'users',
    data: {
      email: 'hi@blacksquirrel.dev',
      password: 'adminpwd1234',
    },
  })
}
