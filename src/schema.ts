//import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers: any = mergeResolvers(loadedResolvers);

//const { print } = require('graphql');
//const printedTypeDefs = print(typeDefs);
//console.log(printedTypeDefs);

//const schema = makeExecutableSchema({ typeDefs, resolvers });

//export default schema;
