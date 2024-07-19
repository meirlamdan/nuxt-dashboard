import { eq, SQL, ilike, desc as sqlDesc, and, count } from "drizzle-orm";
//  eq, and, ilike, SQL, count, getTableColumns, sql, desc as sqlDesc

import { db } from "../db/dbConnect";
import { items, Item, NewItem } from "../db/schema"

type Params = {
  filters?: string
  limit?: number
  offset?: number
  order?: keyof Item
  desc?: 'true' | 'false'
}

type Filters = {
  name?: string
}


const ItemCtrl = {
  async getItems({ filters, limit = 5, offset = 0, order, desc }: Params = { limit: 5, offset: 0 }) {
    const whereAnd: SQL[] = []
    const filtersObj: Filters = JSON.parse(filters || "{}")
    if (filtersObj?.name) {
      whereAnd.push(ilike(items.name, `%${filtersObj.name}%`))
    }
    const orderBy: any[] = []
    if (order) {
      orderBy.push(desc === 'true' ? sqlDesc(items[order]) : items[order])
    }
    const itemsList: Item[] = db.select().from(items).where(and(...whereAnd)).limit(limit).offset(offset)
    const itemsCount: { count: number }[] = db.select({ count: count() }).from(items).where(and(...whereAnd))
    const [rows, [c]] = await Promise.all([itemsList, itemsCount])
    return { rows, count: c.count }
  },
  async getItemById(id: Item['id']) {
    const [item]: Item[] = await db.select().from(items).where(eq(items.id, id))
    return item
  },
  async createItem(item: NewItem) {
    const [newItem]: Item[] = await db.insert(items).values(item).returning();
    return newItem
  },

  async updateItem(id: Item['id'], item: Item) {
    const [newItem]: Item[] = await db.update(items).set(item).where(eq(items.id, id)).returning();
    return newItem
  },
  async deleteItem(id: Item['id']) {
    const [item]: Item[] = await db.delete(items).where(eq(items.id, id))
    return item
  }
}
export default ItemCtrl


