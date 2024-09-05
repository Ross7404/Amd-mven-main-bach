// challenges.shared.js
export const challengePath = 'challenges'

export const challengeMethods = ['find', 'get', 'create', 'patch', 'remove']

export const challengeClient = (client) => {
  const connection = client.get('connection')

  client.use(challengePath, connection.service(challengePath), {
    methods: challengeMethods
  })
}
