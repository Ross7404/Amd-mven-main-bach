import { user } from './users/users.js'
import { wasteCategory } from './wastes/waste-categories.js'
import { waste } from './wastes/waste.js'
import { challenge } from './challenges/challenges.js'

export const services = (app) => {
  // Configure user service
  app.configure(user)

  // Configure waste category service
  app.configure(wasteCategory)

  // Configure waste service
  app.configure(waste)

  // Configure challenge service
  app.configure(challenge)

  // All services will be registered here
}