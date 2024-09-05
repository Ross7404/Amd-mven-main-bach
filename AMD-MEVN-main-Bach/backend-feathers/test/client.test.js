// For more information about this file see https://dove.feathersjs.com/guides/cli/client.test.html
import assert from 'assert'
import axios from 'axios'

import rest from '@feathersjs/rest-client'
import { app } from '../src/app.js'
import { createClient } from '../src/client.js'

const port = app.get('port')
const appUrl = `http://${app.get('host')}:${port}`

// Set up the client
const client = createClient(rest(appUrl).axios(axios))

describe('application client tests', () => {
  // Set up and tear down the app
  before(async () => {
    await app.listen(port)
  })

  after(async () => {
    await app.teardown()
  })

  // Test the client initialization
  it('initialized the client', () => {
    assert.ok(client)
  })

  // Test creating and authenticating a user
  it('creates and authenticates a user with email and password', async () => {
    const userData = {
      email: 'someone@example.com',
      password: 'supersecret'
    }

    // Create a user
    const user = await client.service('users').create(userData)

    // Authenticate the user
    const { user: authenticatedUser, accessToken } = await client.authenticate({
      strategy: 'local',
      ...userData
    })

    // Assert the authentication data
    assert.ok(accessToken, 'Created access token for user')
    assert.ok(authenticatedUser, 'Includes user in authentication data')
    assert.strictEqual(authenticatedUser.password, undefined, 'Password is hidden to clients')

    // Log out the user
    await client.logout()

    // Remove the test user on the server
    await app.service('users').remove(user._id)
  })
})