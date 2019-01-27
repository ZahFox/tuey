import * as blessed from 'blessed'
import { Widgets } from 'blessed'
import * as contrib from 'blessed-contrib'

import { Events } from '../events'

import { EventType } from '../common'
import { defaultBoxStyle } from './defaults'
import { navigation, Navigation } from './navigation'

export namespace UI {
  enum PageLayout {
    TWO_VERTICAL,
    TWO_HORIZONTAL
  }

  export class UIException extends Error {
    public constructor(message: string) {
      super(message)
    }
  }

  export interface UIOptions {
    eventBus: Events.EventBus
    log?: (message: string) => void
  }

  export function init({ eventBus }: UIOptions) {
    const screen = blessed.screen({
      autoPadding: true,
      smartCSR: true
    })

    eventBus.publish({ type: EventType.SCREEN_INITIALIZED })

    screen.key(['escape', 'q', 'C-c'], (ch, key) => {
      return process.exit(0)
    })

    screen.title = 'tuey'

    const uiNavigation: Navigation = navigation(
      [generatePage(PageLayout.TWO_VERTICAL), generatePage(PageLayout.TWO_HORIZONTAL)],
      {
        eventBus,
        screen,
        controlKeys: true
      }
    )

    uiNavigation.enable()
  }

  function generatePage(layout: PageLayout) {
    switch (layout) {
      case PageLayout.TWO_VERTICAL:
        return (screen: Widgets.Screen, page: number) => {
          const grid = new contrib.grid({ rows: 12, cols: 12, screen })

          const topBox = grid.set(0, 0, 6, 12, blessed.box, {
            parent: screen,
            content: 'Top',
            style: defaultBoxStyle
          })

          topBox.focus()

          grid.set(6, 0, 6, 12, blessed.box, { parent: screen, content: 'Bottom', style: defaultBoxStyle })
        }
      case PageLayout.TWO_HORIZONTAL:
        return (screen: Widgets.Screen, page: number) => {
          const grid = new contrib.grid({ rows: 12, cols: 12, screen })
          grid.set(0, 0, 12, 6, blessed.box, { parent: screen, content: 'Left', style: defaultBoxStyle })
          grid.set(0, 6, 12, 6, blessed.box, { parent: screen, content: 'Right', style: defaultBoxStyle })
        }
      default:
        throw new UIException(`${layout} is not a valid page layout.`)
    }
  }
}
