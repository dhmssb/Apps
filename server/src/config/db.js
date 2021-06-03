const mongoose = require('mongoose');

const mongodbConnection = mongoose.connect(
    process.env.MONGO,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err, conn) => {
    if (err) throw err;
    console.log('Database connected!');
  }
);

module.exports = mongodbConnection;
