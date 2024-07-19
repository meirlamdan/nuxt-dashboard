import ItemCtrl from "~/server/controllers/item"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)
  const item = await ItemCtrl.updateItem(id, body)
  return item
})