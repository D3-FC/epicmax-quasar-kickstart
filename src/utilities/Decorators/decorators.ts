import { createDecorator } from 'vue-class-component'
import { DataObject } from '../DataObject'

export const NoCache = createDecorator((options: DataObject, key) => {
  options.computed[key].cache = false
})
