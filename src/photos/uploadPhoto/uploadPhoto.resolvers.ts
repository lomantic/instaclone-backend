import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import processHashtags from "../photos.utils";
const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtagsObjs = null;
        if (caption) {
          hashtagsObjs = processHashtags(caption);
        }
        const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");

        return await client.photo.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            file: fileUrl,
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
