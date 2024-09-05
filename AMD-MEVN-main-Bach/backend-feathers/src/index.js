import { app } from './app.js'
import { logger } from './logger.js'
import { setupRedis } from './redisClient.js' // Import the setup function for Redis

const port = app.get('port')
const host = app.get('host')

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

// Setup Redis client and pass the app instance
setupRedis(app)

// Start the FeathersJS application
app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
