import ItemCtrl from "~/server/controllers/item"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const items = await ItemCtrl.getItems(query)
  return items
})