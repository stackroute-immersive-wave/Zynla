let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let schema = new mongoose.Schema({
  author: String,
  timestamp: String,
   id: {type:Number,required:true},
   likes:{
     type:[],
     default:undefined
   },
   rating:Number,
  toc: [
    {
      Domain: String,
      name: String,
      _id : false,
      title: String,
      Chapter: {
        type:[
          {
            name: String,
            _id : false,
            Topic: {
              type:[
                {
                  name: String,
                  _id : false,
                  Subtopic: String
                }
              ],
              default:undefined
            }
          }
        ],
        default:undefined
      }
    }
  ]
  });

  const model = mongoose.model('tocDoc', schema);
  module.exports = model;
