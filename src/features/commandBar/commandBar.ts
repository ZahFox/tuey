import { Feature, FeatureOptions } from '../interfaces'
import { Keycode } from '../../common'

export const commandBar: Feature = {
  init: ({ subscribeToKeycode }: FeatureOptions) => {
    if (subscribeToKeycode) {
      subscribeToKeycode(Keycode.A, async () => {})
    }
  }
}
