let driver = require('../config/neo4j');
const redis = require('redis');
let session = driver.session();
const client = redis.createClient();
let getDataFromNeo4j = {
  /*eslint-disable*/
  getConceptFromNeo4j: function(req, res) {

   let query = 'MATCH (m:concept)<-[:same_as]-(n:concept) with collect(m.name) as concept,collect(n.name) as base RETURN concept,base';
/*eslint-enable*/
    session.run(query).then(function(result) {
      if (result) {
        // console.log(result.records);
        let intentTerms,baseIntents;
    for(let k = 0 ; k<result.records.length ;k=k+1)
    {
      intentTerms = result.records[k]._fields[0];
      baseIntents = result.records[k]._fields[1];
   }
   for (let i = 0; i < intentTerms.length; i = i + 1) {
      /* inserting 'intents' in redis */
      /*eslint-disable*/
      client.hmset(['concepts', intentTerms[i], baseIntents[i]], function(err, reply) {

      });
      /*eslint-enable*/
  }

      }
   });
},
/*eslint-disable*/
getIntentFromNeo4j: function(req, res) {
  let query = 'MATCH (m:intent)-[:same_as]->(n:intent) with collect(m.name) as intent,collect(n.name) as base RETURN intent,base;';
  /*eslint-enable*/
  session.run(query).then(function(result) {
      if (result) {
        let intentTerms,baseIntents;
    for(let k = 0 ; k<result.records.length ; k=k+1)
    {
      intentTerms = result.records[k]._fields[0];
      baseIntents = result.records[k]._fields[1];
   }
   for (let i = 0; i < intentTerms.length; i = i + 1) {
      /* inserting 'intents' in redis */
      /*eslint-disable*/
      client.hmset(['intents', intentTerms[i], baseIntents[i]], function(err, reply) {

      });
      /*eslint-enable*/
  }

      }
   });
 }
};
module.exports = getDataFromNeo4j;
