require("dotenv").config();
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema";
import client from "./client";
import { getUser } from "./users/users.utils";
import * as logger from "morgan";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
      client,
    };
  },
});
//npm i apollo-server-express@2.19
const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.listen({ port: PORT }, () => {
  console.log(`Apollo Server open http://localhost:${PORT}/graphql`);
});
