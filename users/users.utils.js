import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (authorization) => {
  try {
    if (!authorization) {
      return null;
    }
    const { id } = await jwt.verify(authorization, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const protectResolver = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "You need to login ",
    };
  }
  return resolver(root, args, context, info);
};
