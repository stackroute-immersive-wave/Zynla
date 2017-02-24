const List = require('./listdocEntity');
const logger = require('./../../applogger');

let listController = {

    addList: function(req, res) {
        logger.debug('Inside list add post');
        let newList = new List({
            id: req.body.id,
            displayImage: req.body.displayImage,
            heading: req.body.heading,
            question: req.body.question,
            postedBy: req.body.postedBy,
            addedOn: req.body.addedOn,
            category: req.body.category,
            upVotes: req.body.upVotes,
            downVotes: req.body.downVotes,
            answerCounts: req.body.answerCounts,
            topCards: req.body.isAccepted
        });

        newList.save().then((doc) => {
            res.send(doc);
        }, (err) => {
            res.send(err);
        });
    },

    viewList: function(req, res) {
        logger.debug('Inside get');
        List.find().then((docs) => {
            res.send(docs);
        }, (err) => {
            res.send(err);
        });
    }
};

module.exports = listController;
