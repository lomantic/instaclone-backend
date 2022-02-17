import client from "../../client";
import bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";

export default {
  Mutation: {
    //This is called currying ES6 function returning another function
    editProfile: protectResolver(
      async (
        _,
        { firstName, lastName, username, email, password: newPassword },
        { loggedInUser }
      ) => {
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            //if uglyPassword is true then add {password: uglyPassword} ES6
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Couldn't update profile.",
          };
        }
      }
    ),
  },
};
