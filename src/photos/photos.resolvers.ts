import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) => {
      return client.user.findUnique({ where: { id: userId } });
    },

    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
    likes: ({ id }) =>
      client.like.count({
        where: { photoId: id },
      }),
  },
};

export default resolvers;
