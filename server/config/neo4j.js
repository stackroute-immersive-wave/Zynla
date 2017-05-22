module.exports = (function() {
  let neo4j = require('neo4j-driver').v1;
<<<<<<< HEAD

  let driver = neo4j.driver('bolt://172.23.239.149', neo4j.auth.basic('neo4j', 'admin'));

=======
  let driver = neo4j.driver('bolt://172.23.239.149', neo4j.auth.basic('neo4j', 'admin'));
>>>>>>> 38fd25d37b96f4425ab4a5be2f13e0d95d35bb6b
  return driver;
}());
