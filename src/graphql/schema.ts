import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Dog {
    id: ID!
    name: String!
    dateOfBirth: String!
    breed: String!
    owners: [User]!
  }

  #todo - owners [] and type

  type Query {
    getDog(name: String, breed: String): [Dog!]!
    listAllDogs: [Dog!]!
    getUser(id: ID!): User
  }

  type Mutation {
    updateDogNameById(id: ID!, newName: String!): Dog
    addUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
    addDogOwner(dogId: ID!, userId: ID!): Dog!
  }
`;
