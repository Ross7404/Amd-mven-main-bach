// challenges.js
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  challengeDataValidator,
  challengePatchValidator,
  challengeQueryValidator,
  challengeResolver,
  challengeExternalResolver,
  challengeDataResolver,
  challengePatchResolver,
  challengeQueryResolver
} from './challenges.schema.js'
import { ChallengeService, getOptions } from './challenges.class.js'
import { challengePath, challengeMethods } from './challenges.shared.js'

export * from './challenges.class.js'
export * from './challenges.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const challenge = (app) => {
  // Register our service on the Feathers application
  app.use(challengePath, new ChallengeService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: challengeMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(challengePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(challengeExternalResolver), schemaHooks.resolveResult(challengeResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [authenticate('jwt')],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(challengeQueryValidator), schemaHooks.resolveQuery(challengeQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(challengeDataValidator), schemaHooks.resolveData(challengeDataResolver)],
      patch: [schemaHooks.validateData(challengePatchValidator), schemaHooks.resolveData(challengePatchResolver)],
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
