import { Log } from './log'
import { UI } from './ui'

const { info }: Log.Logger = Log.init()

UI.init({ log: info })
