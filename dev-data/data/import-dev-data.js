const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

// const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
// const Review = require('../../models/reviewModel');

dotenv.config({ path: '../../config.env' });

// const DB = process.env.DATABASE.replace(
//   '<db_password>',
//   process.env.DATABASE_PASSWORD,
// );

const DB =
  'mongodb+srv://vedamnagamanoj:zbvHqAsLchWne1yr@re-cluster0.4nkwr.mongodb.net/renatours?retryWrites=true&w=majority&appName=re-Cluster0';

mongoose.connect(DB).then(() => console.log('Database connection successful'));

// Reading JSON file

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
// fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
// );

// Import data into database

const importData = async () => {
  try {
    // await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

// delete all existing data from collection
const deleteData = async () => {
  try {
    // await Tour.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
