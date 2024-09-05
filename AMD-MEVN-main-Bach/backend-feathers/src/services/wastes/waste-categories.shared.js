export const wasteCategoryPath = 'waste-categories'

export const wasteCategoryMethods = ['find', 'get', 'create', 'patch', 'remove']

export const wasteCategoryClient = (client) => {
  const connection = client.get('connection')

  client.use(wasteCategoryPath, connection.service(wasteCategoryPath), {
    methods: wasteCategoryMethods
  })
}
