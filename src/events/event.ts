export namespace Events {
  export interface Event {}

  export interface EventBus {
    publish<T extends Event>(event: T): void
  }
}
