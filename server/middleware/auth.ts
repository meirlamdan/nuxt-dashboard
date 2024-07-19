import UserCtrl from "~/server/controllers/user"

export default defineEventHandler(async (event) => {
  // if (!event.context.user && getCookie(event, 'h3')) {
  //   event.context.user = await UserCtrl.getUserBySession(event)
  // }
})