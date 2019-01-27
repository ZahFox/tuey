import * as blessed from 'blessed'
import { Widgets } from 'blessed'
import * as contrib from 'blessed-contrib'

import { defaultBoxStyle } from './defaults'

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
    log?: (message: string) => void
  }

  export function init({ log }: UIOptions) {
    if (!log) {
      log = () => {}
    }

    const screen = blessed.screen({
      autoPadding: true,
      smartCSR: true
    })

    log('Screen Initialized')

    screen.key(['escape', 'q', 'C-c'], (ch, key) => {
      return process.exit(0)
    })

    screen.title = 'tuey'

    const carousel = new (contrib as any).carousel(
      [generatePage(PageLayout.TWO_VERTICAL), generatePage(PageLayout.TWO_HORIZONTAL)],
      {
        screen,
        interval: 0,
        controlKeys: true
      }
    )

    carousel.start()
  }

  function generatePage(layout: PageLayout) {
    switch (layout) {
      case PageLayout.TWO_VERTICAL:
        return (screen: Widgets.Screen) => {
          const grid = new contrib.grid({ rows: 12, cols: 12, screen })

          grid.set(0, 0, 6, 12, blessed.box, {
            parent: screen,
            content: 'Top',
            style: defaultBoxStyle
          })

          grid.set(6, 0, 6, 12, blessed.box, { parent: screen, content: 'Bottom', style: defaultBoxStyle })
        }
      case PageLayout.TWO_HORIZONTAL:
        return (screen: Widgets.Screen) => {
          const grid = new contrib.grid({ rows: 12, cols: 12, screen })
          grid.set(0, 0, 12, 6, blessed.box, { parent: screen, content: 'Left', style: defaultBoxStyle })
          grid.set(0, 6, 12, 6, blessed.box, { parent: screen, content: 'Right', style: defaultBoxStyle })
        }
      default:
        throw new UIException(`${layout} is not a valid page layout.`)
    }
  }
}
