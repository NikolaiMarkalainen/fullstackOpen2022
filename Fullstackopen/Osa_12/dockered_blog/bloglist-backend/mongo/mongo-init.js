require('dotenv').config()

db.createUser({
    user: `${process.env.MONGODB_USERNAME}`,
    pwd: `${process.env.MONGODB_PASSWORD}`,
    roles: [
      {
        role: 'dbOwner',
        db: `${process.env.MONGODB_DATABASE}`,
      },
    ],
  });
  