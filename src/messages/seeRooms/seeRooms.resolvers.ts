import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
const resolvers: Resolvers = {
  Query: {
    seeRooms: protectResolver(async (_, __, { loggedInUser, client }) =>
      client.room.findMany({
        where: {
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};

export default resolvers;
