import type { H3Event, EventHandlerRequest } from 'h3'
import type { User } from '../db/schema'

export function currentUser(event: H3Event<EventHandlerRequest>) {
  return event.context.user
}

export function isAdmin(event: H3Event<EventHandlerRequest>) {
  return event.context.user?.role === 'admin'
}


