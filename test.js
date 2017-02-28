let neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://192.168.56.1", neo4j.auth.basic("neo4j", "9455338161"));
var session = driver.session();
console.log("Connected...");
var query = 'match (n:Domain) return n';
session.run(query).then(function(result){
    for(var x of result.records)
          console.log(x._fields[0].properties.name);
      session.close();
      driver.close();
});