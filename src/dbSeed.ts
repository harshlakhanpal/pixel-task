import { User } from './models/User';
import { Dog } from './models/Dog';

const seedDb = async () => {
  const userCount = await User.countDocuments();
  const dogCount = await Dog.countDocuments();

  if (userCount > 0 || dogCount > 0) {
    console.log('Db previously seeded');
    return;
  }

  console.log('seeding users data');
  const users = await User.insertMany([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
    { name: 'David', email: 'david@example.com' },
    { name: 'Eve', email: 'eve@example.com' },
    { name: 'Frank', email: 'frank@example.com' },
    { name: 'Grace', email: 'grace@example.com' },
    { name: 'Heidi', email: 'heidi@example.com' },
    { name: 'Ivan', email: 'ivan@example.com' },
    { name: 'Judy', email: 'judy@example.com' },
  ]);

  console.log('seeding dogs data');
  const getRandomUserId = (): unknown =>
    users[Math.floor(Math.random() * users.length)]._id;

  const dogs = await Dog.insertMany([
    {
      name: 'Buddy',
      breed: 'Golden Retriever',
      dateOfBirth: '2018-02-10',
      owners: [getRandomUserId()],
    },
    {
      name: 'Max',
      breed: 'Labrador',
      dateOfBirth: '2017-06-21',
      owners: [getRandomUserId()],
    },
    {
      name: 'Bella',
      breed: 'Beagle',
      dateOfBirth: '2019-03-05',
      owners: [getRandomUserId()],
    },
    {
      name: 'Charlie',
      breed: 'Bulldog',
      dateOfBirth: '2016-11-30',
      owners: [getRandomUserId()],
    },
    {
      name: 'Lucy',
      breed: 'Poodle',
      dateOfBirth: '2018-08-17',
      owners: [getRandomUserId()],
    },
    {
      name: 'Daisy',
      breed: 'Boxer',
      dateOfBirth: '2020-01-12',
      owners: [getRandomUserId()],
    },
    {
      name: 'Molly',
      breed: 'Dachshund',
      dateOfBirth: '2015-04-22',
      owners: [getRandomUserId()],
    },
    {
      name: 'Bailey',
      breed: 'Rottweiler',
      dateOfBirth: '2017-09-03',
      owners: [getRandomUserId()],
    },
    {
      name: 'Maggie',
      breed: 'Siberian Husky',
      dateOfBirth: '2019-12-15',
      owners: [getRandomUserId()],
    },
    {
      name: 'Rocky',
      breed: 'Doberman',
      dateOfBirth: '2016-07-25',
      owners: [getRandomUserId()],
    },
  ]);

  console.log('Database seeding completed');
};

export default seedDb;
