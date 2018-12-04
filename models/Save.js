const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const SaveSchema = new Schema({
  repousername: {
    type: String,
    required: "There must be a username attached to this save"
  },
  reponame: {
    type: String,
    required: "There must be a repository attached to this save"
  },
  // releases: [
  //   {
  //     type: Int,
  //   }
  // ],
  // arrowsTo: [
  //   {
  //     type: Int,
  //   }
  // ],
  // arrowsFrom: [
  //   {
  //     type: Int
  //   }
  // ]
});

// This creates our model from the above schema, using Mongoose's model method
var Save = mongoose.model('Save', SaveSchema);

// Export the Tweet model
module.exports = Save;