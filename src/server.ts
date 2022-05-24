require("dotenv").config();
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema";
import client from "./client";
import { getUser } from "./users/users.utils";
import * as logger from "morgan";
import pubsub from "./pubsub";
import { createServer } from "http";

//console.log(pubsub);

const PORT = process.env.PORT;
//npm i apollo-server-express@2.19

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.authorization),
        client,
      };
    } else {
      //console.log(ctx);
      return {
        loggedInUser: ctx.connection.context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ authorization }: { authorization?: string }) => {
      if (!authorization) {
        throw new Error("You can't listen");
      }
      const loggedInUser = await getUser(authorization);
      //console.log(loggedInUser);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
const httpServer = createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
  console.log(`Apollo Server open http://localhost:${PORT}/graphql`);
});
