import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const photo = await client.photo.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });
        if (!photo) {
          return {
            ok: false,
            error: "Photo not found",
          };
        } else if (photo.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized",
          };
        } else {
          await client.photo.delete({
            where: {
              id,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolvers;
