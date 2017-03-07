let driver = require('../config/neo4j');
let session = driver.session();
const Answer = require('./carddocEntity');

let cardController = {

    addAnswer: function(req, res) {
        // console.log('inside add router');
        /*eslint-disable*/
        let query = ' \
  match (q:Question), \
 (u:User {name:"' + req.body.mail + '"}) \
 where id(q) = ' + req.body.questionId + ' \
 create (n:Answer {Content:"' + req.body.content + '"}), \
 (l:Like {count:0}), \
 (dl:Unlike {Count:0}), \
 (n)-[:has]->(l),\
 (l)-[:context_of]->(q),\
 (n)-[:has]->(dl),\
 (dl)-[:context_of]->(q),\
 (n)-[:answer_of]->(q), \
 (u)-[:post {on : timestamp()}]->(n) \
 return n \
  ';
        /*eslint-enable*/
        session.run(query).then(function(result) {
            // console.log('query run :', result);
            /*eslint-disable*/
            let id = result.records[0]._fields[0].identity.low;
            /*eslint-enable*/
            let db = new Answer({id: id, createdBy: req.body.mail,
              content: req.body.content, answeredOn: new Date().getTime()});
            db.save(function(err) {
                if (err) {
                    res.send('Error:' + err);
                } else {
                    res.send('saved successfully');
                }
            });
        });
    }
};

module.exports = cardController;
