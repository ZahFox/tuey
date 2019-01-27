import { Events } from './events'
import { Log } from './log'
import { UI } from './ui'

import { EventType, NavigationPageChangedEvent, ScreenInitializedEvent } from './common'

async function init() {
  const { info }: Log.Logger = await Log.init()

  const eventBus: Events.EventBus = new Events.EventBus()

  const pageChangedEventHandler = Events.EventsHandler<NavigationPageChangedEvent>(
    EventType.NAVIGATION_PAGE_CHANGED,
    (event: NavigationPageChangedEvent) => {
      info(`UI changed from page: ${event.lastPage} to page: ${event.currentPage}`)
    }
  )

  const screenInitializedEventHandler = Events.EventsHandler<ScreenInitializedEvent>(
    EventType.SCREEN_INITIALIZED,
    (event: ScreenInitializedEvent) => {
      info(`UI screen initialized`)
    }
  )

  eventBus.register([pageChangedEventHandler, screenInitializedEventHandler])

  await UI.init({ eventBus })
}

init()
