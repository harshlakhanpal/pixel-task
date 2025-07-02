import { Dog } from '../models/Dog';
import { User } from '../models/User';
import { Types } from 'mongoose';
import { GraphQLError } from 'graphql';

type UpdateDogNameById = {
  id: string;
  newName: string;
};

export const resolvers = {
  Query: {
    getDog: async (_: any, args: { name?: string; breed?: string }) => {
      try {
        const filter: { name?: string; breed?: string } = {};
        if (args.name) filter.name = args.name;
        if (args.breed) filter.breed = args.breed;

        const dogs = await Dog.find(filter);
        return dogs;
      } catch (error) {
        throw new GraphQLError('failed to fetch dogs', {
          extensions: { code: 'GET_DOG_FAILED', error },
        });
      }
    },

    listAllDogs: async () => {
      try {
        return await Dog.find({});
      } catch (error) {
        throw new GraphQLError('failed to list all dogs', {
          extensions: { code: 'LIST_DOGS_FAILED', error },
        });
      }
    },

    getUser: async (_: any, { id }: { id: string }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new GraphQLError('user not found', {
            extensions: { code: 'USER_NOT_FOUND' },
          });
        }
        return user;
      } catch (error) {
        throw new GraphQLError('failed to fetch user', {
          extensions: { code: 'GET_USER_FAILED', error },
        });
      }
    },
  },

  Mutation: {
    updateDogNameById: async (_: any, args: UpdateDogNameById) => {
      try {
        const { id, newName: name } = args;
        const updatedDog = await Dog.findByIdAndUpdate(
          id,
          { name },
          { new: true }
        );
        if (!updatedDog) {
          throw new GraphQLError('dog not found', {
            extensions: { code: 'DOG_NOT_FOUND' },
          });
        }
        return updatedDog;
      } catch (error) {
        throw new GraphQLError('failed to update dog name', {
          extensions: { code: 'UPDATE_DOG_FAILED', error },
        });
      }
    },

    addUser: async (
      _: any,
      { name, email }: { name: string; email: string }
    ) => {
      try {
        const existing = await User.findOne({ email });
        if (existing) {
          throw new GraphQLError('email already in use', {
            extensions: { code: 'DUPLICATE_EMAIL' },
          });
        }
        const newUser = new User({ name, email });
        return await newUser.save();
      } catch (error) {
        throw new GraphQLError('failed to add user', {
          extensions: { code: 'ADD_USER_FAILED', error },
        });
      }
    },

    updateUser: async (
      _: any,
      { id, name, email }: { id: string; name?: string; email?: string }
    ) => {
      try {
        const update: Partial<{ name: string; email: string }> = {};
        if (name) update.name = name;
        if (email) update.email = email;

        const updatedUser = await User.findByIdAndUpdate(id, update, {
          new: true,
        });
        if (!updatedUser) {
          throw new GraphQLError('user not found', {
            extensions: { code: 'USER_NOT_FOUND' },
          });
        }
        return updatedUser;
      } catch (error) {
        throw new GraphQLError('failed to update user', {
          extensions: { code: 'UPDATE_USER_FAILED', error },
        });
      }
    },

    addDogOwner: async (
      _: any,
      { dogId, userId }: { dogId: string; userId: string }
    ) => {
      try {
        const dog = await Dog.findByIdAndUpdate(
          dogId,
          { $addToSet: { owners: userId } }, // considering no duplicate owners allowed
          { new: true }
        ).populate('owners');

        if (!dog) {
          throw new GraphQLError('dog not found', {
            extensions: { code: 'DOG_NOT_FOUND' },
          });
        }

        return dog;
      } catch (error) {
        throw new GraphQLError('failed to add dog owner', {
          extensions: { code: 'ADD_DOG_OWNER_FAILED', error },
        });
      }
    },
    //todo : addDog mutation
    addDog: async (
      _: any,
      {
        name,
        breed,
        dateOfBirth,
        owners = [],
      }: { name: string; breed: string; dateOfBirth: string; owners?: string[] }
    ) => {
      try {
        const dog = new Dog({
          name,
          breed,
          dateOfBirth,
          owners,
        });
        const savedDog = await dog.save();
        return await savedDog.populate('owners');
      } catch (error) {
        throw new GraphQLError('failed to add dog', {
          extensions: { code: 'ADD_DOG_FAILED', error },
        });
      }
    },
  },

  Dog: {
    id: (dog: { _id: Types.ObjectId }) => dog._id.toString(),
    owners: async (dog: any) => {
      try {
        return await User.find({ _id: { $in: dog.owners } });
      } catch (error) {
        throw new GraphQLError('failed to fetch dog owners', {
          extensions: { code: 'DOG_OWNERS_FETCH_FAILED', error },
        });
      }
    },
  },

  User: {
    id: (user: { _id: Types.ObjectId }) => user._id.toString(),
  },
};
