module.exports = (function() {
  let neo4j = require('neo4j-driver').v1;
<<<<<<< HEAD
  let driver = neo4j.driver('bolt://172.23.239.149', neo4j.auth.basic('neo4j', 'admin'));
=======
  let driver = neo4j.driver('bolt://172.23.239.220', neo4j.auth.basic('neo4j', 'admin'));
>>>>>>> 0b9589cb01aaf33336b076cbc4e39c7fc4c384b4
  return driver;
}());
