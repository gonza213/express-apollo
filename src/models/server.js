const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../graphql/schema");
const db = require("../config/database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    //BD is conected
    this.dbConnection();

    //middlewares
    this.middlewares();

    //Apollo
    this.apollo();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database is connected.");
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    //Parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static('src/public'))
  }

  async apollo() {
    this.apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        return req
      },
    });

    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({ app: this.app });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}

module.exports = Server;
