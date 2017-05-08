const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const quesSchema = new mongoose.Schema({
  name:String,
  gender:String,
  dob:String,
  description:String,
  address:{
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
});
module.exports = mongoose.model('userProfileQues', quesSchema);
