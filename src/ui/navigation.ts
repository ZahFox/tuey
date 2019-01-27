import { Widgets } from 'blessed'

import { Events } from '../events'

import { EventType } from '../common'

export type PageGenerator = (screen: Widgets.Screen, page: number) => void

export interface NavigationOptions {
  eventBus: Events.EventBus
  controlKeys?: boolean
  rotate?: boolean
  screen: Widgets.Screen
}

export interface Navigation {
  next: () => void
  prev: () => void
  home: () => void
  end: () => void
  enable: () => void
}

export function navigation(pages: PageGenerator[], options: NavigationOptions): Navigation {
  const screen = options.screen
  let currentPage = 0
  let lastPage = currentPage

  const move = () => {
    let i = screen.children.length
    while (i--) screen.children[i].detach()

    pages[currentPage](screen, currentPage)

    screen.render()

    options.eventBus.publish({ type: EventType.NAVIGATION_PAGE_CHANGED, lastPage, currentPage })
  }

  const next = () => {
    lastPage = currentPage
    currentPage++

    if (currentPage === pages.length) {
      if (!options.rotate) {
        currentPage--
        return
      } else {
        currentPage = 0
      }
    }

    move()
  }

  const prev = () => {
    lastPage = currentPage
    currentPage--

    if (currentPage < 0) {
      if (!options.rotate) {
        currentPage++
        return
      } else {
        currentPage = pages.length - 1
      }
    }

    move()
  }

  const home = () => {
    currentPage = 0
    move()
  }

  const end = () => {
    currentPage = pages.length - 1
    move()
  }

  const enable = () => {
    move()

    if (options.controlKeys) {
      screen.key(['right', 'left', 'home', 'end'], (ch: any, key: { name: string }) => {
        if (key.name === 'right') next()
        if (key.name === 'left') prev()
        if (key.name === 'home') home()
        if (key.name === 'end') end()
      })
    }
  }

  return {
    next,
    prev,
    home,
    end,
    enable
  }
}
