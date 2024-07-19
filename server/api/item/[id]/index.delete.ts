import ItemCtrl from "~/server/controllers/item"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const item = await ItemCtrl.deleteItem(id)
  return item
})
