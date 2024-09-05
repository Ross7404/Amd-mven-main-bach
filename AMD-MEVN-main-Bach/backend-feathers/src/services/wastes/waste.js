import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  wasteDataValidator,
  wastePatchValidator,
  wasteQueryValidator,
  wasteResolver,
  wasteExternalResolver,
  wasteDataResolver,
  wastePatchResolver,
  wasteQueryResolver
} from './waste.schema.js'
import { WasteService, getOptions } from './waste.class.js'
import { wastePath, wasteMethods } from './waste.shared.js'

export * from './waste.class.js'
export * from './waste.schema.js'

export const waste = (app) => {
  app.use(wastePath, new WasteService(getOptions(app)), {
    methods: wasteMethods,
    events: []
  })

  app.service(wastePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(wasteExternalResolver), schemaHooks.resolveResult(wasteResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [authenticate('jwt')],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(wasteQueryValidator), schemaHooks.resolveQuery(wasteQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(wasteDataValidator), schemaHooks.resolveData(wasteDataResolver)],
      patch: [schemaHooks.validateData(wastePatchValidator), schemaHooks.resolveData(wastePatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
