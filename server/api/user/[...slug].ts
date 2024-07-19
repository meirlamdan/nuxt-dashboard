import { createRouter, defineEventHandler, useBase } from 'h3'

import type { User } from "~/server/db/schema"
import UserCtrl from "~/server/controllers/user"

const router = createRouter()

// router.get('/', defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const users = await UserCtrl.getUsers(query)
//   return users
// }))

router.get('/auth', defineEventHandler(async (event) => {
  const user: User | undefined = await UserCtrl.getUserBySession(event)
  return user
}))


router.get('/logout', defineEventHandler(async (event) => {
  await UserCtrl.logout(event)
  return
}))


router.post('/login', defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await UserCtrl.login(event, body)
  return user
}))


router.post('/signUp', defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await UserCtrl.createUser(event, body)
  return user
}))


export default useBase('/api/user', router.handler)
