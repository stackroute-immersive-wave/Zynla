let driver = require('../config/neo4j');
const redis = require('redis');
let session = driver.session();
const client = redis.createClient();
let getDataFromNeo4j = {
  /*eslint-disable*/
  getConceptFromNeo4j: function(req, res) {

//  console.log('inside get concept from neo4j');
   let query = 'MATCH (m:concept)<-[:same_as]-(n:concept) with collect(m.name) as concept,collect(n.name) as base RETURN concept,base';
    session.run(query).then(function(result) {
      if (result) {
        // console.log(result.records);
        let intentTerms,baseIntents;
    for(let k = 0 ; k<result.records.length ; k++)
    {
      intentTerms = result.records[k]._fields[0];
      baseIntents = result.records[k]._fields[1];
   }
   for (let i = 0; i < intentTerms.length; i = i + 1) {
      /* inserting 'intents' in redis */
      client.hmset(['concepts', intentTerms[i], baseIntents[i]], function(err, reply) {
          if (reply) {

          }
      });
  }

      }
   });
},
getDomainsFromNeo4j:function(req,res){
  let query="match (n:domain) return collect(n.name) as domainArray";
  session.run(query).then(function(result) {
    if (result) {
        let domainAray=result.records[0]._fields[0];
        domainAray.forEach((domain)=>{
          client.sadd("domain",domain)
        })
    }
  })
},
getTopicFromNeo4j:function(req,res){
  // let query="MATCH (m:concept)-[:concept_of]->(n:concept) return collect(m.name) as subtopic,collect(n.name) as topic";
  let query="MATCH (m:concept)-[:concept_of]->(n:concept) with {concept :n.name,subconcept:collect(m.name)} as obj return collect(obj)";
  session.run(query).then(function(result) {
    if (result) {
      // let subconceptsArray=result.records[0]._fields[0];
      // let conceptsArray=result.records[0]._fields[1]
      result.records[0]._fields[0].forEach((value,index)=>{
        client.sadd(value.concept,value.subconcept)
        console.log(value.concept,value.subconcept)
      })
      // subconceptsArray.forEach((subconcept,index)=>{
      //   client.hmset(['subconcepts',subconcept,conceptsArray[index]])
      // })
    }
  })
},
getIntentFromNeo4j: function(req, res) {
 // console.log('inside get intent from neo4j');
  // let session = driver.session();
  // const client = redis.createClient();
  // let query = 'MATCH (m:intent)-[:same_as]->(n:intent) with collect(m.name) as intent,collect(n.name) as base RETURN intent,base;';
  // session.run(query).then(function(result) {
  //     if (result) {
  //       // console.log(result.records);
  //       let intentTerms,baseIntents;
  //   for(let k = 0 ; k<result.records.length ; k++)
  //   {
  //     intentTerms = result.records[k]._fields[0];
  //     baseIntents = result.records[k]._fields[1];
  //  }
  //  for (let i = 0; i < intentTerms.length; i = i + 1) {
  //     /* inserting 'intents' in redis */
  //     client.hmset(['intents', intentTerms[i], baseIntents[i]], function(err, reply) {
  //         if (reply) {
  //         }
  //     });
  // }
  //
  //     }
  //  });

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
