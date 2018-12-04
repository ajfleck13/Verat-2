const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const UserSchema = new Schema({
  username: {
    type: String,
    required: "There must be a username attached to this save"
  },
  Save: [{
    type: Schema.Types.ObjectId,
    ref: "Save"
  }],
});

// This creates our model from the above schema, using Mongoose's model method
var User = mongoose.model('User', UserSchema);

// Export the Tweet model
module.exports = User;