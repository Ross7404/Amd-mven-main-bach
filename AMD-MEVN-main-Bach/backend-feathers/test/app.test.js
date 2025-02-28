// For more information about this file see https://dove.feathersjs.com/guides/cli/app.test.html
import assert from 'assert'
import axios from 'axios'
import { app } from '../src/app.js'

const port = app.get('port')
const appUrl = `http://${app.get('host')}:${port}`

describe('Feathers application tests', () => {
  let server

  // Set up and tear down the app
  before(async () => {
    server = await app.listen(port)
  })

  after(async () => {
    await app.teardown()
  })

  // Test the index page
  it('starts and shows the index page', async () => {
    const response = await axios.get(appUrl)
    const { data } = response

    assert.ok(data.indexOf('<html lang="en">') !== -1)
  })

  // Test a 404 JSON error
  it('shows a 404 JSON error', async () => {
    try {
      await axios.get(`${appUrl}/path/to/nowhere`, {
        responseType: 'json'
      })
      assert.fail('should never get here')
    } catch (error) {
      const { response } = error

      // Assert the error response
      assert.strictEqual(response?.status, 404)
      assert.strictEqual(response?.data?.code, 404)
      assert.strictEqual(response?.data?.name, 'NotFound')
    }
  })
})