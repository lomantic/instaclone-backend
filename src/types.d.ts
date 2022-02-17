import { PrismaClient, User } from "@prisma/client";

type Context = {
  //not required
  loggedInUser?: User;
  client: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  //Query Mutation stuff
  [key: string]: {
    //name of function
    [key: string]: Resolver; //parameter inside of function
  };
};
