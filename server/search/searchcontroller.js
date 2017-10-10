const List = require('../list/listdocEntity');
const userList = require('../users/userEntity');
const userProfileList = require('../users/userProfileEntity').userModel;
let driver = require('../config/neo4j');
let searchController = {

    getPeople: function(req, res) {
    const role = 'search';
    const cmd = 'searchuser';

    const question = req.body.q;
    const searchMicroservice = require('seneca')();

    /* ToDO: Move IP and Port to config */

    searchMicroservice.client({pin: 'role:search, cmd:searchuser', host: '127.0.0.1', port: 3000});

      searchMicroservice.act({role, cmd}, {question}, (err, answer) => {
        res.send(answer);
      });
    },

    getuserprofile: function(req, res) {
        let session = driver.session();
        let query = 'match (n:concept {name:"' + req.body.q + '"})<-[:following]-(u:user) return u';
        session.run(query).then(function(result) {
            let arr = [];
            for (let x = 0; x < result.records.length; x = x + 1) {
                /* eslint-disable */
                let y = result.records[x]._fields[0].properties.name;
                /* eslint-enable */
                arr.push(y);
            }
            // console.log(arr);
           userList.find({
                email: {
                    $in: arr
                }
            }).then((docs) => {
               res.send(docs);
                session.close();
            });
        }).catch(function() {
            userList.find().then((docs) => {
                res.send(docs);
                session.close();
            });
        });
        session.close();
    },

    getQuestions: function(req, res) {
        let session = driver.session();
        /* eslint-disable */
        let query = 'match (n:concept)-[*1..2]-(m:question) \
         where n.name="'+ req.body.q + '" return m';
         /* eslint-enable */
         console.log(query)
        session.run(query).then(function(result) {
            let arr = [];
            for (let x = 0; x < result.records.length; x = x + 1) {
                /* eslint-disable */
                let y = result.records[x]._fields[0].identity.low;
                /* eslint-enable */
                arr.push(y);
            }
            const arrobj = [];
            List.find({
                id: {
                    $in: arr
                }
            }).then((docs) => {
                arrobj.push(docs);
                res.send(docs);
                session.close();
            });
        }).catch(function() {
            List.find().then((docs) => {
                res.send(docs);
                session.close();
            });
        });
        //<Shambhavi> 4/19/2017 commented because it
        // was responsible app crashing and unnecessary data was
      //displayed on search of related questions of certain concept.
       // session.close();
    },

    getConcepts: function(req, res) {
      const role = 'get';
      const cmd = 'getConcepts';

      const concept = req.body.concept;
      console.log(req.body)
      const searchMicroservice = require('seneca')();

      /* ToDO: Move IP and Port to config*/

      searchMicroservice.client({pin: 'role:get, cmd:getConcepts', host: '127.0.0.1', port: 3000});

        searchMicroservice.act({role, cmd}, {concept}, (err, answer) => {
          res.send(answer);
        });
    },

    followUser: function(req, res) {
       let session = driver.session();
       /* eslint-disable */
       let query = 'match(n:user {emailid:"' + req.body.id + '"}),\
                (m:user {emailid:"' + req.body.emailId + '"})\
                create (n)-[:following]->(m)\
                return n,m;';
       /* eslint-enable */
       session.run(query).then(function() {
           userProfileList.findOneAndUpdate({
           emailId: req.body.id
       }, {
           $push: {
               followingUser: req.body.emailId
           }
       }, {new: true}).then(() => {
           res.send('following user added');
       }, (err) => {
           res.send(err);
       });
       userProfileList.findOneAndUpdate({
       emailId: req.body.emailId
   }, {
       $inc: {
           followerCount: 1
       }
   }, {new: true}).then(() => {
       res.send('followerCount Incremented');
   }, (err) => {
       res.send(err);
   });
           session.close();
           res.send('success');
       });
   },
   //#Abu 25/4/2017 (Query to unfollow the people and decrementing the following)
     unfollowUser: function(req, res) {
        let session = driver.session();
        /* eslint-disable */
        let query = 'match(n:user {emailid:"' + req.body.id + '"})-[f:following]->(m:user {emailid:"' + req.body.emailId + '"}) delete f return m;';
        /* eslint-enable */
        console.log(query);
        session.run(query).then(function() {
            userProfileList.findOneAndUpdate({
            emailId: req.body.id
        }, {
            $pop: {
                followingUser: req.body.emailId
            }
        }, {new: true}).then(() => {
            res.send('followed user deleted');
        }, (err) => {
            res.send(err);
        });
        userProfileList.findOneAndUpdate({
        emailId: req.body.emailId
     }, {
        $inc: {
            followerCount: -1
        }
     }, {new: true}).then(() => {
        res.send('followerCount Decremented');
     }, (err) => {
        res.send(err);
     });
            session.close();
            res.send('success');
        });
     },
    isFollow: function(req, res) {
       /*eslint-disable*/
        let query = 'match (n:user {emailid:"' + req.body.name + '"})-[:following]->(m:user) return m';
        /*eslint-enable*/
        let session = driver.session();
        session.run(query).then(function(result) {
            let namearr = [];
            for (let x = 0; x < result.records.length; x = x + 1) {
                /* eslint-disable */
                 console.log('follow ',result.records[x]._fields[0].properties.emailid);
                let name = result.records[x]._fields[0].properties.emailid;
                /* eslint-enable */
                namearr.push(name);
            }
            let array = JSON.parse(req.body.emailArray);
            let follow = [];
            for (let received of array) {
              let temp = false;
              for(let mail of namearr) {
                if(received === mail) {
                  temp = true;
                }
              }
              if(temp) {
                follow.push({emailId: received, follow: true});
              }
              else {
                follow.push({emailId: received, follow: false});
              }
            }
            res.send(follow);
        });
    },
    isFollowTopic: function(req, res) {
      const role = 'get';
      const cmd = 'isFollowTopic';

      const q = req.body.q;
      const name = req.body.name;
      const searchMicroservice = require('seneca')();

      /* ToDO: Move IP and Port to config*/

      searchMicroservice.client({
        pin: 'role:get, cmd:isFollowTopic', host: '127.0.0.1', port: 3000});

        searchMicroservice.act({role, cmd}, {q, name}, (err, answer) => {
          res.send(answer);
        });  /* eslint-disable */

    },
    followTopic: function(req, res) {
      const role = 'do';
      const cmd = 'followTopic';

      const id = req.body.id;
      const concept = req.body.concept;
      const searchMicroservice = require('seneca')();

      /*ToDO: Move IP and Port to config*/

      searchMicroservice.client({pin: 'role:do, cmd:followTopic', host: '127.0.0.1', port: 3000});

        searchMicroservice.act({role, cmd}, {id, concept}, (err, answer) => {
          res.send(answer.result);
        });  /* eslint-disable */

    },
    //#Abu (29/4/2017) To Unfollow topic by calling user-search-microservice.js
        UnFollowTopic: function(req, res) {
          const role = 'do';
          const cmd = 'UnFollowTopic';

          const id = req.body.id;
          const concept = req.body.concept;
          const searchMicroservice = require('seneca')();

          /*ToDO: Move IP and Port to config*/

          searchMicroservice.client({pin: 'role:do, cmd:UnFollowTopic', host: '127.0.0.1', port: 3000});

            searchMicroservice.act({role, cmd}, {id, concept}, (err, answer) => {
              console.log("Unfollow topic inside searchController ");
              console.log(answer.result);
              res.send(answer.result);
            });  /* eslint-disable */

        }
};

module.exports = searchController;
