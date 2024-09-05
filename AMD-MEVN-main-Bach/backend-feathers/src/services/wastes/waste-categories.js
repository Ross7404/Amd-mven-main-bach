import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  wasteCategoryDataValidator,
  wasteCategoryPatchValidator,
  wasteCategoryQueryValidator,
  wasteCategoryResolver,
  wasteCategoryExternalResolver,
  wasteCategoryDataResolver,
  wasteCategoryPatchResolver,
  wasteCategoryQueryResolver
} from './waste-categories.schema.js'
import { WasteCategoryService, getOptions } from './waste-categories.class.js'
import { wasteCategoryPath, wasteCategoryMethods } from './waste-categories.shared.js'

export * from './waste-categories.class.js'
export * from './waste-categories.schema.js'

export const wasteCategory = (app) => {
  app.use(wasteCategoryPath, new WasteCategoryService(getOptions(app)), {
    methods: wasteCategoryMethods,
    events: []
  })
  app.service(wasteCategoryPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(wasteCategoryExternalResolver), schemaHooks.resolveResult(wasteCategoryResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [authenticate('jwt')],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(wasteCategoryQueryValidator), schemaHooks.resolveQuery(wasteCategoryQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(wasteCategoryDataValidator), schemaHooks.resolveData(wasteCategoryDataResolver)],
      patch: [schemaHooks.validateData(wasteCategoryPatchValidator), schemaHooks.resolveData(wasteCategoryPatchResolver)],
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
