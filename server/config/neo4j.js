module.exports = (function() {
  let neo4j = require('neo4j-driver').v1;
  let driver = neo4j.driver('bolt://172.23.239.220', neo4j.auth.basic('neo4j', 'admin'));
  return driver;
}());
