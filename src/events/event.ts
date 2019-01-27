import 'reflect-metadata'
import { Subject } from 'rxjs'

import { Bus } from './bus'
import { Event, EventType } from '../common'
export namespace Events {
  export const EVENT_HANDLER_METADATA = Symbol()

  export type EventStream = Subject<Event>
  export type EventHandler<T extends Event> = (event: T) => void

  interface EventTypeBusType {
    publish<T extends Event>(event: T): void
    register(handlers: Array<EventHandler<Event>>): void
  }

  /**
   * Used to label a function as an event handler for one or more Event Types
   *
   * @param EventTypes An array of Event Types
   */
  export function EventsHandler<T extends Event>(eventTypes: EventType | EventType[], handler: EventHandler<T>) {
    const metaData = Array.isArray(eventTypes) ? eventTypes : [eventTypes]
    Reflect.defineMetadata(EVENT_HANDLER_METADATA, metaData, handler)
    return handler
  }

  export class EventBus extends Bus<Event> implements EventTypeBusType {
    private readonly streams: Map<EventType, EventStream>

    public constructor() {
      super()
      this.streams = new Map()
    }

    public publish<T extends Event>(event: T): void {
      const stream: EventStream = this.streams.get(event.type) as EventStream
      stream.next(event)
    }

    public register(handlers: Array<EventHandler<any>>): void {
      for (const handler of handlers) {
        const associatedEventTypes = Reflect.getMetadata(EVENT_HANDLER_METADATA, handler)
        for (const type of associatedEventTypes) {
          let stream = this.streams.get(type)

          if (!stream) {
            stream = new Subject<Event>()
            this.streams.set(type, stream)
          }

          stream.subscribe(handler)
        }
      }
    }
  }
}
