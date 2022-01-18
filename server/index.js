const express = require('express')
const {getGraphQLParams, graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')

const users = [
  {id: 1, username: 'Tom', age: 20},
  {id: 2, username: 'John', age: 20},
  {id: 3, username: 'Smith', age: 20}
]

const app = express()

app.use(cors())
app.use(express.json())

const createUser = (input) => {
  const id = Date.now()
  return {
    id, ...input
  }
}

const root = {
  getAllUsers: () => {
    return users
  },
  getUser: ({id}) => {
    return users.find(user => user.id == id)
  },
  createUser: ({input}) => {
    const user = createUser(input)
    users.push(user)
    return user
  }
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server has been stated on port: ${PORT}`))