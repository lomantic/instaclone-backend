import client from "../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // check if username or email is unique on DB
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/password is occupied");
        }

        // hash pwd
        const uglyPassword = await bcrypt.hash(password, 10);
        //console.log(uglyPassword);
        // save and return user
        // we use the browser's waiting property so that we do not have to use await in return
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
    login: async (_, { username, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      // check pwd with args.pwd
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
      // issue a token and send it to user
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
