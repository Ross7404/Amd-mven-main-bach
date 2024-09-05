import '@feathersjs/transport-commons'
import { logger } from './logger.js'

export const channels = (app) => {
  // Log a warning message
  logger.warn(
    'Publishing all events to all authenticated users. See `channels.js` and https://dove.feathersjs.com/api/channels.html for more information.'
  )

  // Set up event listeners
  app.on('connection', connectionEstablished)
  app.on('login', userLoggedIn)

  // Set up event publisher
  app.publish(eventPublisher)

  // Event listener functions
  function connectionEstablished(connection) {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection)
  }

  function userLoggedIn(authResult, { connection }) {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection)

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection)
    }
  }

  // Event publisher function
  function eventPublisher(data, context) {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated')
  }
}