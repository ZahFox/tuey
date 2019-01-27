export enum EventType {
  NONE,
  KEY_PRESSED,
  KEY_RELEASED,
  MOUSE_BUTTON_PRESSED,
  MOUSE_BUTTON_RELEASED,
  MOUSE_MOVED,
  MOUSE_SCROLLED
}

export interface EventBase {
  type: EventType
}

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

export type Event =
  | NoneEvent
  | KeyPressedEvent
  | KeyReleasedEvent
  | MouseButtonPressedEvent
  | MouseButtonReleasedEvent
  | MouseMovedEvent
  | MouseScrolledEvent
