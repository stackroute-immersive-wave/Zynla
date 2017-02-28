// const logger = require('./../../applogger');
// const userModel = require('./carddocEntity').userModel;
//
// // let userController = {
// //     add: function(req, res) {
// //         logger.debug('Inside user post');
// //         let db = new userModel(req.body);
// //         db.save();
// //         res.send('Added successfully');
// //     },
// //     find: function(req, res) {
// //         userModel.find(req.body, function(err, docs) {
// //             if (err) {
// //                 res.send('Error:' + err);
// //             } else if (docs !== null) {
// //                 res.send(docs);
// //             } else {
// //                 res.send('incorrect');
// //             }
// //         });
// //     },
// //     update: function(req, res) {
// //         userModel.update(req.body.old, req.body.new, function(err, docs) {
// //             if (err) {
// //                 res.send('Error:' + err);
// //             } else if (docs !== null) {
// //                 res.send(docs);
// //             } else {
// //                 res.send('not changed');
// //             }
// //         });
// //     },
// //     login: function(req, res) {
// //       res.json({responseText:'authenticated'});
// //    },
// //
// //    logout: function(req, res){
// //      console.log('Session deleted');
// //      req.session.destroy();
// //      res.send({redirect: '/'});
// //    }
// // }
// module.exports = userController;
