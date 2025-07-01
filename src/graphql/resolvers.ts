import { Dog } from '../models/Dog';
import { User } from '../models/User';
import { Types } from 'mongoose';

type UpdateDogNameById = {
  id: string;
  newName: string;
};
export const resolvers = {
  Query: {
    getDog: async (_: any, args: { name?: string; breed?: string }) => {
      const filter: any = {}; // todo : fix type for this
      if (args.name) filter.name = args.name;
      if (args.breed) filter.breed = args.breed;
      const dogs = await Dog.find(filter);
      return dogs;
    },
    listAllDogs: async () => {
      const dogs = await Dog.find({});
      return dogs;
    },
    getUser: async (_: any, { id }: { id: string }) => {
      return User.findById(id);
    },
  },
  Mutation: {
    updateDogNameById: async (_: any, args: UpdateDogNameById) => {
      const { id, newName: name } = args;
      const updatedDog = await Dog.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      return updatedDog;
    },
    addUser: async (
      _: any,
      { name, email }: { name: string; email: string }
    ) => {
      const newUser = new User({ name, email });
      return newUser.save();
    },

    updateUser: async (
      _: any,
      { id, name, email }: { id: string; name?: string; email?: string }
    ) => {
      const update: Partial<{ name: string; email: string }> = {};
      if (name) {
        update['name'] = name;
      }
      if (email) {
        update['email'] = email;
      }
      return User.findByIdAndUpdate(id, update, { new: true });
    },

    addDogOwner: async (
      _: any,
      { dogId, userId }: { dogId: string; userId: string }
    ) => {
      const dog = await Dog.findByIdAndUpdate(
        dogId,
        { $addToSet: { owners: userId } }, // considering no duplicate owners allowed
        { new: true }
      ).populate('owners');

      if (!dog) throw new Error('Could not update dogs details');
      return dog;
    },
  },

  //todo : addDog mutation

  Dog: {
    id: (dog: { _id: Types.ObjectId }) => dog._id.toString(),
    owners: async (dog: any, _: any) => {
      return await User.find({ _id: { $in: dog.owners } });
    },
  },
  User: {
    id: (user: { _id: Types.ObjectId }) => user._id.toString(),
  },
};
