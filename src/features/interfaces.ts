import { Keycode } from '../common'

export interface FeatureOptions {
  subscribeToKeycode?: (keycode: Keycode, subscriber: Subscriber) => void
}

export interface Feature {
  init: (options: FeatureOptions) => void
}

export type Subscriber = () => Promise<void>
export type SubscriptionSet = Subscriber[]
