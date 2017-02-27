'use strict';
const router = require('express').Router();
const Answer = require('./carddocEntity').model;
let neo4j = require('neo4j-driver').v1;
let driver = neo4j.driver('bolt://192.168.1.204', neo4j.auth.basic('neo4j', '9455338161'));
let session = driver.session();

router.post('/add', function(req, res) {
  /*eslint-disable*/
  let query = ' \
    match (q:Question), \
    (u:User {name:"'+req.body.mail+'"}) \
    where id(q) = '+req.body.questionId+' \
    create (n:Answer {Content:"'+req.body.content+'"}), \
    (n)-[:answer_of]->(q), \
    (u)-[:post {on : timestamp()}]->(n) \
    return n \
  ';
  /*eslint-enable*/
  session.run(query).then(function(result) {
      // console.log(result);
      /*eslint-disable*/
      let id = result.records[0]._fields[0].identity.low;
      /*eslint-enable*/
      let db = new Answer({
        id: id,
        createdBy: req.body.mail,
        Content: req.body.content,
        answeredOn: new Date().getTime()
      });
      db.save(function(err) {
        if(err) {
          res.send('Error:' + err);
        }
        else{
          res.send('saved successfully');
        }
      });
  });
});

// router.get('/',function(req, res) {
//   answer.find().then((docs) => {
//         res.send(docs);
//         logger.debug(docs);
//     }, (err) => {
//         res.status(400).send(err);
//         logger.debug(err);
//     });
// });

module.exports = router;
