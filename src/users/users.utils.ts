import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver, Context } from "../types";

export const getUser = async (authorization: any) => {
  try {
    if (!authorization) {
      return null;
    }
    const verifiedToken: any = await jwt.verify(
      authorization,
      process.env.SECRET_KEY
    );
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken["id"] },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const protectResolver =
  (resolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "You need to login ",
        };
      }
    }
    return resolver(root, args, context, info);
  };
