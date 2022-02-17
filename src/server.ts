require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import client from "./client";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
      client,
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Apollo Server open http://localhost:${PORT}/`));
