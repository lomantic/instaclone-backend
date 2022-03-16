import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        if (caption) {
          //parse caption
          const hashtags = caption.match(/#[\w]/g);
          //create or get hashtags
        }
        client.photo.create({
          data: {
            file,
            caption,
            hashtags: {
              connectOrCreate: [
                {
                  where: {
                    hashtag: "#food",
                  },
                  create: {
                    hashtag: "#food",
                  },
                },
              ],
            },
          },
        });
        //save the photo with parsed hashtags into
        //add the photo to the ..
      }
    ),
  },
};
export default resolvers;
