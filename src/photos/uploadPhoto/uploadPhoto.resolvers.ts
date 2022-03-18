import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtagsObjs = null;
        if (caption) {
          //parse caption
          const hashtags = caption.match(/#[\w]+/g);
          hashtagsObjs = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
          //create or get hashtags
        }
        return await client.photo.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            file,
            caption,
            ...(hashtagsObjs.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagsObjs,
              },
            }),
          },
        });
        //save the photo with parsed hashtags into
        //add the photo to the ..
      }
    ),
  },
};
export default resolvers;
