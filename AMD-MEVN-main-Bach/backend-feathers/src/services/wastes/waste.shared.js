export const wastePath = 'waste-items'

export const wasteMethods = ['find', 'get', 'create', 'patch', 'remove']

export const wasteClient = (client) => {
  const connection = client.get('connection')

  client.use(wastePath, connection.service(wastePath), {
    methods: wasteMethods
  })
}
