import ItemCtrl from "~/server/controllers/item"

export default defineEventHandler(async (event) => {
  const item = await readBody(event)
  const newItem = await ItemCtrl.createItem(item)
  return newItem
})