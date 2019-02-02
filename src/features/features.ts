import { Events } from '../events'

import { EventType, Keycode } from '../common'
import { commandBar } from './commandBar'
import { FeatureOptions, Subscriber, SubscriptionSet } from './interfaces'

export namespace Features {
  export interface FeaturesOptions {
    eventBus: Events.EventBus
  }

  export async function init({ eventBus }: FeaturesOptions): Promise<void> {
    const keycodeSubscriptions = new Map<Keycode, SubscriptionSet>()

    const subscribeToKeycode = (keycode: Keycode, subscriber: Subscriber) => {
      const subscriptionSet = keycodeSubscriptions.get(keycode)

      if (!subscriptionSet) {
        keycodeSubscriptions.set(keycode, [subscriber])
      } else {
        subscriptionSet.push(subscriber)
      }
    }

    initializeFeatures({ subscribeToKeycode })

    eventBus.publish({ type: EventType.MODULE_INITIALIZED, name: 'features' })
  }

  function initializeFeatures(options: FeatureOptions) {
    commandBar.init(options)
  }
}
