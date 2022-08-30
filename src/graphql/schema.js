const { gql } = require("apollo-server-express");
const {typeDefsUsers, resolversUsers} = require("./usuarios")
const {typeDefsAuth, resolversAuth} = require("./auth")

const rootQuery = gql`
  type Query{
    _: String
  }
`

const typeDefs = [rootQuery, typeDefsUsers, typeDefsAuth]

const resolvers = [resolversUsers, resolversAuth]

module.exports = {
    typeDefs,
    resolvers,
}