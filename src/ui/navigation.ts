import { Widgets } from 'blessed'

export type PageGenerator = (screen: Widgets.Screen, page: number) => void

export interface NavigationOptions {
  controlKeys?: boolean
  rotate?: boolean
  screen: Widgets.Screen
}

export interface Navigation {
  move: () => void
  next: () => void
  prev: () => void
  home: () => void
  end: () => void
  enable: () => void
}

export function navigation(pages: PageGenerator[], options: NavigationOptions): Navigation {
  const screen = options.screen
  let currPage = 0

  const move = () => {
    let i = screen.children.length
    while (i--) screen.children[i].detach()

    pages[currPage](screen, currPage)

    screen.render()
  }

  const next = () => {
    currPage++

    if (currPage === pages.length) {
      if (!options.rotate) {
        currPage--
        return
      } else {
        currPage = 0
      }
    }

    move()
  }

  const prev = () => {
    currPage--

    if (currPage < 0) {
      if (!options.rotate) {
        currPage++
        return
      } else {
        currPage = pages.length - 1
      }
    }

    move()
  }

  const home = () => {
    currPage = 0
    move()
  }

  const end = () => {
    currPage = pages.length - 1
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
    move,
    next,
    prev,
    home,
    end,
    enable
  }
}
