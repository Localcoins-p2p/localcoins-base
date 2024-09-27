import { saleMutations, userMutations } from './mutations';
import { salesQueries, userQueries } from './queries';
import projectQueries from './project-bridge/queries';
import projectMutations from './project-bridge/mutations';
import projectTypes from './project-bridge/types';
import Date from './types/Date';

const resolvers = {
  Query: {
    ...userQueries,
    ...salesQueries,
    ...projectQueries,
  },
  Mutation: {
    ...userMutations,
    ...saleMutations,
    ...projectMutations,
  },
  Date,
  ...projectTypes,
};

export default resolvers;
