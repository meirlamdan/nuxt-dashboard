import type { H3Event, EventHandlerRequest } from 'h3'
import UserCtrl from "~/server/controllers/user"

//  defineEventHandler(async (event) => {
//   const query = getQuery(event)
//   const users = await UserCtrl.getUsers(query)
//   return users
// })

export default defineEventHandler({
  onRequest: [(event) => {
    if (!isAdmin(event)) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    }
  }],
  onBeforeResponse: [],
  handler: async (event) => {
    const query = getQuery(event)
    const users = await UserCtrl.getUsers(query)
    return users
  },
})
