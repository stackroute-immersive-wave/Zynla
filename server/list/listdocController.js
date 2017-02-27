const List = require('./listdocEntity');
const logger = require('./../../applogger');
<<<<<<< HEAD
const nodemailer = require('nodemailer');
let host = 'localhost:8080';
=======
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a

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
<<<<<<< HEAD
    },
    inviteFrnds: function(req, res) {
  // router.post('/send', function handleSayHello(req, res) {
     logger.debug(req.body.data);
     let transporter = nodemailer.createTransport({
         /*eslint-disable */
         service: 'Gmail',
         secure: false,
         auth: {
             user: 'geniegenie0001@gmail.com', // Your email id
             pass: 'genie123' // Your password
         },
         tls: {
             rejectUnauthorized: false
         }
     });

     host = req.get('host');
     /*eslint-disable */
    //  // var hashVID = bcrypt.hashSync(profile[0].local.verificationID, 10);
    //  var VID = profile[0].generateHashVID(profile[0].local.verificationID);
    //  /*eslint-enable */
    //  VIDcheck = VID;
    //  // var linkEmail = profile[0].generateHashEmail(profile[0].local.email);
    //  logger.debug(VID + ' is the VID');
    //  link = 'http://' + req.get('host') + '/users/verify?id=' + VID + '&email=' + profile[0].local.email;
    let link = 'http://' + req.get('host') + '/users/invited?email='+req.body.mail;
     var text = 'Hello from \n\n' + req.body.data;
     let mailOptions = {
         from: 'geniegenie0001@gmail.com', // sender address
         to: req.body.mail, // list of receivers
         subject: 'Invitation from Zynla', // Subject line
         text: text,
         html: '<center><h1>Welcome to Zynla</h1></center><br><br><br>'+
         'Hi,<br><br>This is the invitation to join in zynla.'+
         '<br><br><br><a href=' + link + ' style=background-color:#44c767 ;'+
         '-moz-border-radius:28px;-webkit-border-radius:28px;border-radius:28px;'+
         'border:1px solid #18ab29 ;display:inline-block;padding:16px 31px;'+
         'color:#ffffff ;text-shadow:0px 1px 0px #2f6627 ;'+
         'text-decoration:none;> Join </a><br><br>'
     };
     logger.debug(mailOptions + host);
     transporter.sendMail(mailOptions, function(error, info) {
         if (error) {
             logger.debug(error);
             logger.debug('Error')
         } else {
             logger.debug('Message sent: ' + info.response);
             res.json({yo: info.response});
         }
     });
 }
=======
    }
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a
};

module.exports = listController;
