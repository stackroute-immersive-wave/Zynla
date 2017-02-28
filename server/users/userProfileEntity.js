const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const schema = new mongoose.Schema({
    id: {
      type: Number,
      required: true
    },
    emailId: {
      type: String,
      required: true
    },
    profile: {
      picture: String,
      description: String,
      dob: String,
      gender: String,
      address: {
        Line1: String,
        Line2: String,
        country: String,
        region: String,
        city: String,
        postalCode: String
        },
      education: {
        primary: String,
        highSchool: String,
        university: String
      },
      phone: String
    },
    lists: [{
      id: {
        type: Number
      },
      heading: String,
      category: String,
      statement: String,
      image: String,
      displayImage: String,
      addedOn: String,
      upVote: Number,
      postedBy: String,
      acceptedCount: Number,
      downVote: Number
    }],
    answers: [{
      id: {
        type: Number
      },
      statement: String,
      addedOn: String,
      image: String,
      upVote: Number,
      downVote: Number
    }],
    watchingList: [{
      heading: String,
      category: String,
      statement: String,
      postedBy: String,
      addedOn: String,
      noofans: Number,
      upVotes: Number,
      downVotes: Number
    }],
    watchingTopic: [{
      type: String
    }],
    interestCategory: [{
      type: String
    }],
    reputation: {
      type: Number
    },
    followingUser: [{
      type: Number
    }],
    followerCount: {
      type: Number
    }
});
const model = mongoose.model('userDoc', schema);
module.exports = {
    userModel: model
};
