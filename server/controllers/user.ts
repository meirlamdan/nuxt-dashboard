import { eq, SQL, ilike, desc as sqlDesc, and, count } from "drizzle-orm";
import bcrypt from "bcrypt";

import { db } from "../db/dbConnect";
import { users, User, NewUser, sessions, Session } from "../db/schema"


type Params = {
  filters?: string
  limit?: number
  offset?: number
  order?: keyof User
  desc?: 'true' | 'false'
}
type Filters = {
  name?: string
  email?: string
}


const UserCtrl = {
  async getUsers({ filters, limit = 5, offset = 0, order, desc }: Params = { limit: 5, offset: 0 }) {
    const whereAnd: SQL[] = []
    const filtersObj: Filters = JSON.parse(filters || "{}")
    if (filtersObj?.name) {
      whereAnd.push(ilike(users.name, `%${filtersObj.name}%`))
    }
    if (filtersObj?.email) {
      whereAnd.push(ilike(users.email, `%${filtersObj.email}%`))
    }
    const orderBy: any[] = []
    if (order) {
      orderBy.push(desc === 'true' ? sqlDesc(users[order]) : users[order])
    }
    const usersList: User[] = db.select().from(users).where(and(...whereAnd)).limit(limit).offset(offset)
    const usersCount: { count: number }[] = db.select({ count: count() }).from(users).where(and(...whereAnd))
    const [rows, [c]] = await Promise.all([usersList, usersCount])
    return { rows, count: c.count }
  },

  async getUserByEmail(email: User['email']) {
    const [user]: User[] = await db.select().from(users).where(eq(users.email, email));
    return user
  },
  async createUser(event: any, user: NewUser) {
    if (!user.email || !user.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Missing email or password'
      })
    }
    if (await this.getUserByEmail(user.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'email already eexist'
      })
    }
    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const [newUser]: User[] = await db.insert(users).values(user).returning();
    await this.createSession(event, newUser.id)

    return newUser
  },

  async login(event: any, { email, password }: { email: User['email'], password: User['password'] }) {

    const user = await this.getUserByEmail(email)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: 'Invalid email or password'
      })
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: 'Invalid email or password'
      })
    }
    await this.createSession(event, user.id)
    return user
  },

  async createSession(event: any, userId: User['id']) {

    const [newSession]: Session[] = await db.insert(sessions).values({ userId }).returning();

    // create session
    const session = await useSession(event, {
      password: process.env.SESSION_PASSWORD!,
      maxAge: 60 * 60 * 24 * 7,// 7 days
    })
    console.log({ sessionId: newSession.id });

    await session.update({
      sessionId: newSession.id
    });
  },

  async getUserBySession(event: any) {
    const session = await useSession(event, {
      password: process.env.SESSION_PASSWORD!,
    });

    const [sessionAndUser]: [{ user: User, session: Session }] =
      await db.select()
        .from(sessions).where(eq(sessions.id, session.data.sessionId))
        .leftJoin(users, eq(users.id, sessions.userId))

    if (!sessionAndUser) return
    return sessionAndUser.user
  },
  async logout(event: any) {
    await clearSession(event, {
      password: process.env.SESSION_PASSWORD!,
    })
    //TODO remove session from db
  }
}
export default UserCtrl


