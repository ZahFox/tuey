export enum EventType {
  /* ~~~ Input Events ~~~ */
  NONE,
  KEY_PRESSED,
  KEY_RELEASED,
  MOUSE_BUTTON_PRESSED,
  MOUSE_BUTTON_RELEASED,
  MOUSE_MOVED,
  MOUSE_SCROLLED,

  /* ~~~ UI Events ~~~ */
  NAVIGATION_PAGE_CHANGED,
  SCREEN_INITIALIZED
}

export interface EventBase {
  type: EventType
}

/* ~~~ Input Events ~~~ */

export interface NoneEvent extends EventBase {
  type: EventType.NONE
}

export interface KeyPressedEvent extends EventBase {
  type: EventType.KEY_PRESSED
  key: string
}

export interface KeyReleasedEvent extends EventBase {
  type: EventType.KEY_RELEASED
  key: string
}

export interface MouseButtonPressedEvent extends EventBase {
  type: EventType.MOUSE_BUTTON_PRESSED
  button: number
}

export interface MouseButtonReleasedEvent extends EventBase {
  type: EventType.MOUSE_BUTTON_RELEASED
  button: number
}

export interface MouseMovedEvent extends EventBase {
  type: EventType.MOUSE_MOVED
  x: number
  y: number
}

export interface MouseScrolledEvent extends EventBase {
  type: EventType.MOUSE_SCROLLED
  xOffset: number
  yOffset: number
}

/* ~~~ UI Events ~~~ */

export interface NavigationPageChangedEvent extends EventBase {
  type: EventType.NAVIGATION_PAGE_CHANGED
  lastPage: number
  currentPage: number
}

export interface ScreenInitializedEvent extends EventBase {
  type: EventType.SCREEN_INITIALIZED
}

export type Event =
  | NoneEvent
  | KeyPressedEvent
  | KeyReleasedEvent
  | MouseButtonPressedEvent
  | MouseButtonReleasedEvent
  | MouseMovedEvent
  | MouseScrolledEvent
  | NavigationPageChangedEvent
  | ScreenInitializedEvent
