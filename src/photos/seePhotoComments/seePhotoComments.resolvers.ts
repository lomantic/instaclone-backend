import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhoto: (_, { id, page }, { client }) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
        take: 5,
        skip: (page - 1) * 5,
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
export default resolvers;
