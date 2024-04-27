const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  bodytext: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for the creator
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  geoLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

postSchema.index({ geoLocation: '2dsphere' });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
