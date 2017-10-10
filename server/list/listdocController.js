const List = require('./listdocEntity');
const userList = require('../users/userProfileEntity').userModel;
// const logger = require('./../../applogger');
const nodemailer = require('nodemailer');
// let host = 'localhost:8080';
let driver = require('../config/neo4j');
let session = driver.session();
let redis = require('redis');
let client = redis.createClient();
let listController = {

  //#Indhu _method to match the question concept with dB concepts (26-Apr-17)
  getQuestionConcept: function(req, res) {
        let val = req.body.intent;
        let concept = [];
        /*eslint-disable*/
        let query = 'match (n:concept)-[:concept_of|:same_as]-(m:concept) where n.name="' + val + '" return m,n';
        /*eslint-enable*/
        session.run(query).then(function(result) {
            session.close();
            for (let i = 0; i < result.records.length; i=i+1) {
                console.log(result.records[i]._fields[0].properties.name);
                concept.push(result.records[i]._fields[0].properties.name);
            }
            res.send(concept);
        });

    },

    //#Indhu _function to get the concept(noun) from the posting question(26-Apr-17)
    nlp: function(req, res) {
        let conceptsArr=[];
        let intentsArr=[];
        let intentLexicon,intentFullLexicon,conceptFullLexicon,conceptLexicon;
        let question = req.body.val;
        let lowerCaseQuestion = question.toLowerCase();
        let pos = require('pos');
        let nlp = require('nlp_compromise');
        client.hkeys('intents', function(err, reply) {
                intentLexicon = reply;
                client.hgetall('intents', function(err, reply) {
                      intentFullLexicon = reply;
                      client.hkeys('concepts', function(err, reply) {
                          conceptLexicon = reply;
                           client.hgetall('concepts', function(err, reply) {
                              conceptFullLexicon = reply;
                              let words = new pos.Lexer().lex(lowerCaseQuestion);
                              let tagger = new pos.Tagger();
                              let taggedWords = tagger.tag(words);
                              console.log(taggedWords)
                              for (let y = 0; y < taggedWords.length; y = y + 1) {
                              if(intentLexicon.includes(taggedWords[y][0]))
                              {
                                console.log(intentLexicon.indexOf(taggedWords[y][0]))
                                console.log(intentFullLexicon[taggedWords[y][0]])
                                intentsArr.push(intentFullLexicon[taggedWords[y][0]])
                              }
                              if(taggedWords[y][1]=="NN" || taggedWords[y][1]=="NNS"){
                              if(conceptLexicon.includes(taggedWords[y][0]))
                              {
                                  conceptsArr.push(conceptFullLexicon[taggedWords[y][0]])
                              }
                              }
                              }
                              let query='unwind $conceptsArr as token MATCH (n:concept)-[:concept_of|:same_as]-(m:concept) where n.name=token return collect(m.name)'
                              console.log(query,conceptsArr)
                              session.run(query,{"conceptsArr":conceptsArr}).then(function(result) {
                                conceptsArr=result.records[0]._fields[0]
                                console.log(result.records[0]._fields)
                                console.log(intentsArr,conceptsArr)
                                res.send({"intentsArr":intentsArr,"conceptsArr":conceptsArr})
                              })
                              });
                          });
                    });

            });
     },
  getLikeStatus: function(req, res) {
  // console.log('router suggest ques');
  /* eslint-disable */
  console.log(req.body);
  // console.log('first',req.body.qids);
  // console.log('second check',req.body.qids);
    let queArray = req.body.qids;
    let mail = req.body.mail;
  let query = 'unwind '+queArray+' as idQues \
  match (n:user {emailid:"'+mail+'"})-[x:liked]-(qu:question) where id(qu)=idQues \
  return x,qu;';
  console.log(query);
  let likeQueIds = [];
  let unlikeQueIds = [];
  /* eslint-enable */
  session.run(query).then(function(result) {
      // console.log(result);
      let queObj = result.records;
      if (result.records.length !== 0) {
          for (let i = 0; i < queObj.length; i = i + 1) {
            /*eslint-disable*/
            likeQueIds.push(queObj[i]._fields[1].identity.low);
          }
          // res.send(likeQueIds);
      }
  }, function(err) {
      // console.log('error while connecting',err);
  });
  let query1 = 'unwind ' + queArray + ' as idQues \
  match (n:user {emailid:"'+mail+'"})-[x:unliked]-(qu:question) where id(qu)=idQues \
  return x,qu;';
  // console.log(query1);
  /* eslint-enable */
  session.run(query1).then(function(result) {
      // console.log(result);
      let queObj1 = result.records;
      if (result.records.length !== 0) {
          for (let i = 0; i < queObj1.length; i = i + 1) {
            /* eslint-disable */
            unlikeQueIds.push(queObj1[i]._fields[1].identity.low);
            /* eslint-enable */
          }
      }
      let a = {like: likeQueIds, unlike: unlikeQueIds};
      res.send(a);
  }, function() {
      // console.log('error while connecting',err);
  });
},
    addList: function(req, res) {
        // logger.debug('Inside list add post');
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
            topCards: req.body.isAccepted,
            views: req.body.views,
            createdBy: req.body.topCards.createdBy,
            content: req.body.topCards.content,
            createdOn: req.body.topCards.createdOn,
            image: req.body.topCards.image,
            upVote: req.body.topCards.upVote,
            downVote: req.body.topCards.downVote,
            isAccepted: req.body.topCards.isAccepted
        });

        newList.save().then((doc) => {
            res.send(doc);
        }, (err) => {
            res.send(err);
        });
    },
    // written by Arun Mohan Raj
    // router function to display all questions
    viewList: function(req, res) {
        // logger.debug('Inside get');
        List.find().then((docs) => {
            res.send(docs);
        }, (err) => {
            res.send(err);
        });
    },
    // router for accepting the answer by user (by sumit on 14/3/2017 )
    UpdateAcceptans: function(req, res) {
        //  console.log('inside update accept', req.body);
        let id = req.body.id;
        let qid = req.body.questionId;
        let email = req.body.email;
        let query = '';
        /*eslint-disable*/
       query = 'match(n:answer),\
                   (p:user {emailid:"' + email + '"}), \
                   (q:question) \
                    where id(n)=' + id + ' and id(q)=' + qid + '\
                   create (n)-[:accepted_by]->(p), \
                   (q)-[:accept]->(n)';
        /*eslint-enable*/
        session.run(query).then(function(result) {
            if (result) {
                // console.log('id', id);
                List.update({
                    id: qid,
                    'topCards.id': id
                }, {
                    $set: {
                        'topCards.$.isAccepted': true
                    }
                }, function(err) {
                    if (err) {
                        // console.log("Something wrong when updating data!");
                    }
                    res.send('success');
                    // console.log(doc);
                });
            } else {
                // console.log("error in updating the like");
            }
        });
    },
    // Router for Getting question data from mongo db created by Aswini K
    getCardQuestion: function(req, res) {
        // console.log('Inside Ques get' + req.params.id);
        List.find({id: req.params.id}).then((docs) => {
            // console.log('inside route', JSON.stringify(docs));
            res.send(docs);
        }, (err) => {
            res.send('Cant get the docs', err);
        });
    },
    getIdWithQuestion: function(req, res) {
       let questionArray = [];
       List.find().then((docs) => {
           // console.log('inside route', JSON.stringify(docs));
           for(let i in docs) {
             /* eslint-disable */
             if(docs[i].heading !== undefined) {
               /* eslint-enable */
               questionArray.push({
                 qId: docs[i].id,
                 qName: docs[i].heading,
                 qDescription: docs[i].question,
                 qPostedBy: docs[i].postedBy,
                 qViews: docs[i].views
               });
             }
           }
           res.send(questionArray);
       }, (err) => {
           res.send('Cant get the docs', err);
       });
   },
    getQuestionIntent: function(req, res) {
      client.hkeys('intents', function(error, reply) {
        if(error) {
          throw error;
     // console.log(error);
        }
        else {
          // console.log(reply);
          res.send(reply);
        }
      });
    },

    getconcepts: function(req, res) {
      client.hgetall('concepts', function(error, reply) {
              if (error) {
                  throw error;
              //  console.log(error);
              }
              else {
                res.send(reply);
                // resCallback(reply);
              }
          });
    },
    // written by Arun Mohan Raj
    // function to display suggested questions
    suggestQues: function(req, res) {
        // console.log('router suggest ques');
        /* eslint-disable */
        let query = 'match(n:Question)-[r:question_of]-> (m:Concept) \
                       where id(n)=' + req.params.id + ' \
                      match (b:QuestionIntent{value:r.intent})-[z:same_as]->(a:QuestionIntent) \
                       -[:same_as]->(l:QuestionIntent) \
                      match (m)<-[:question_of {intent:a.value}]-(s:Question) \
                      match (m)<-[:question_of {intent:l.value}]-(u:Question) \
                      match q=(s)<-[:post]-(cv:User) \
                      return distinct q';
        /* eslint-enable */
        session.run(query).then(function(result) {
            // console.log(result);
            if (result) {
                // console.log('before result');
                res.send(result);
                // console.log('after result');
            }
        }, function() {
            // console.log('error while connecting',err);
        });
    },

    // router function to add a question
    addquestion: function(req, res) {
      console.dir(JSON.parse(req.body.suggestedQuestionconcepts))
      req.body.suggestedQuestionconcept =JSON.parse(req.body.suggestedQuestionconcepts)

      //console.log(req.body.heading)
        // req.body.heading = req.body.heading.charAt(0).toUpperCase() +
        // req.body.heading.substring(1, req.body.heading.length);
        // req.body.statement = req.body.statement.charAt(0).toUpperCase() +
        // req.body.statement.substring(1, req.body.statement.length);
        let arr1 = req.body;
        let arr = [];
        let c = 0;
        let max = 0;
        /*eslint-disable*/
        let imagesArray = [
            'http://www.phonefacts.co.uk/wp-content/uploads/2011/11/1-and-zeros.jpg',
            'http://maxpixel.freegreatpicture.com/static/photo/1x/Online-Digital-Mobile-Smartphone-Data-Computer-1231889.jpg',
            'http://maxpixel.freegreatpicture.com/static/photo/1x/Float-Hand-Keep-About-Ball-Binary-Ball-Binary-457334.jpg',
            'http://maxpixel.freegreatpicture.com/static/photo/1x/Gloomy-Cohesion-Watch-Dark-Responsibility-Darkness-1156942.jpg',
            'https://c1.staticflickr.com/9/8386/8493376660_8e17303a8d.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/IBM_Bluemix_logo.svg/1036px-IBM_Bluemix_logo.svg.png',
            'http://www.oppo.nl/files/2012/03/hd-abstracte-wallpaper-met-felle-kleuren-hd-abstracte-achtergrond.jpg',
            'https://c1.staticflickr.com/8/7570/15087405704_f571d14063_b.jpg',
            'http://maxpixel.freegreatpicture.com/static/photo/1x/Shape-Simple-Hex-Hexagonal-Abstract-Modern-675576.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Barnstar_-_technical_works.svg/2000px-Barnstar_-_technical_works.svg.png',
            'https://previews.123rf.com/images/dskdesign/dskdesign1204/dskdesign120400574/13241701-chemistry-teacher-writing-science-and-chemical-formula-on-whiteboard-Stock-Photo.jpg',
            'https://c1.staticflickr.com/9/8666/16203260320_3b7bc32962_b.jpg',
            'https://thumbs.dreamstime.com/x/abstract-technology-background-planet-white-backdrop-30605816.jpg',
            'https://c1.staticflickr.com/3/2080/2349225230_ef4e238caf.jpg',
            'https://c1.staticflickr.com/5/4078/4819055826_776b042f09_b.jpg',
            'http://theemon.com/wp-content/uploads/2015/11/Semantic.jpg',
            'https://react.semantic-ui.com/logo.png',
            'https://cdn.pixabay.com/photo/2015/06/28/09/36/email-824310_960_720.jpg'
        ];
        /*eslint-enable*/
        let randomNumber = Math.floor(Math.random() * imagesArray.length);
        // query to get all the concepts and find the base concept from the input provided

                // query to post a question at a particular base tag
                /*eslint-disable*/
                console.log("-----------------------");
               // console.log(JSON.parse(req.body));
               let query;
              if(req.body.secounderyIntent=="use"){
                query = 'match (c:concept), \
                           (u:user {emailid:"' + req.body.email + '"}) \
                           where c.name = "' + req.body.suggestedQuestionconcept[0]+ '" \
                           create (n:question {value:"' + req.body.statement + '",name:"' + req.body.heading + '"}), \
                           (use:use),\
                           (n)<-[:use]-(use)<-[:' + req.body.primaryIntent +']-(c), \
                           (u)-[:post {on : timestamp()}]->(n) \
                           return n \
                           ';

              }else if (req.body.primaryIntent=="compare") {
                query = 'match (c:concept),(cc:concept) ,\
                           (u:user {emailid:"' + req.body.email + '"}) \
                           where c.name = "' + req.body.suggestedQuestionconcept[0]+ '" and cc.name="' + req.body.suggestedQuestionconcept[1]+ '"\
                           create (n:question {value:"' + req.body.statement + '",name:"' + req.body.heading + '"}),(o:compare) \
                           (o)<-[:' + req.body.primaryIntent +']-(c), \
                           (o)<-[:' + req.body.primaryIntent +']-(cc), \
                           (o)-[:' + req.body.primaryIntent +']->(n), \
                           (u)-[:post {on : timestamp()}]->(n) \
                           return n \
                           ';
              }else {
                 query = 'match (c:concept), \
                           (u:user {emailid:"' + req.body.email + '"}) \
                           where c.name = "' + req.body.suggestedQuestionconcept[0]+ '" \
                           create (n:question {value:"' + req.body.statement + '",name:"' + req.body.heading + '"}), \
                           (n)<-[:' + req.body.primaryIntent +']-(c), \
                           (u)-[:post {on : timestamp()}]->(n) \
                           return n \
                           ';
              }

                console.log(query);
                /*eslint-enable*/
                session.run(query).then(function(result) {
                    console.log(result.records);
                    if (result) {
                        /*eslint-disable*/
                        let id = result.records[0]._fields[0].identity.low;
                        let date = new Date().getTime();
                        /*eslint-enable*/
                        let db = new List({
                            id: id,
                            category: req.body.Concept,
                            tags: req.body.Concept,
                            heading: req.body.heading,
                            question: req.body.statement,
                            displayImage: imagesArray[randomNumber],
                            profileImage: req.body.profilepicture,
                            addedOn: date,
                            upVotes: '0',
                            downVotes: '0',
                            answerCounts: '0',
                            postedBy: req.body.email,
                            status: {
                                open: true
                            },
                            topCards: [],
                            views: '0'
                        });
                        db.save(function(err) {
                            if (err) {
                                // res.send('Error:' + err);
                            } else {
                                // res.send('successfully posted');
                            }
                        });
                        userList.findOneAndUpdate({
                            emailId: req.body.email
                        }, {
                            $push: {
                                lists: {
                                    id: id,
                                    heading: req.body.heading,
                                    category: req.body.Concept,
                                    statement: req.body.statement,
                                    image: '',
                                    displayImage: imagesArray[randomNumber],
                                    addedOn: new Date().getTime(),
                                    upVote: '0',
                                    postedBy: req.body.email,
                                    acceptedCount: '0',
                                    downVote: '0'
                                }
                            }
                        }, {new: true}).then((doc) => {
                            res.send(doc);
                            // res.redirect('/#/home');
                        }, () => {
                            // res.send(err);
                        });
                    } else {
                        // logger.debug('error occurred');
                    }
                });

    },
    // Router for adding view count in mongo db created by Aswini K
    updateviews: function(req, res) {
        let id = req.body.id;
        // console.log("ID:" + id);
        List.findOneAndUpdate({
            id: id
        }, {
            $set: {
                views: req.body.views
            }
        }, {new: true}).then((doc) => {
            res.send(doc);
        }, (err) => {
            res.send(err);
        });
    },
    /*eslint-disable*/
    // Router for storing comments for question in mongo and neo4j created by Aswini K
    updatecomments: function(req, res) {
      let query = '\
match (n:question),\
(u:user {emailid:"' + req.body.mail + '" })\
where id(n) = ' + req.body.questionId + ' \
create (m:comment{name:"' + req.body.content + '"}),\
 (n)<-[:comment_of]-(m),\
(m)-[:commented_by{on : timestamp()}]->(u)\
return m';
/*eslint-enable*/
        session.run(query).then(function(result) {
            // logger.debug(result);result.records[0]._fields[0].identity.low;
            console.log(result);
            if (result) {
                let id = result.records[0]._fields[0].identity.low;
                console.log("ID:" + id);
                List.findOneAndUpdate({
                    id: req.body.questionId
                }, {
                    $push: {
                        comment: {
                            id: id,
                            createdBy: req.body.createdBy,
                            content: req.body.content,
                            createdOn: new Date().getTime()
                        }
                    }
                }, {new: true}).then((doc) => {
                    console.log(doc);
                    res.send(doc);
                });
            } else {
                // logger.debug('error occurred');
                /*eslint-disable*/
               (err) => {
                    res.send(err);
                }
                /*eslint-enable*/
            }
        });
    },
    /* @pavithra K: get answer comments*/
    getComments: function(req, res) {
        console.log("inside get comments");
        console.log("qid: "+req.body.qid);
        let aid = parseInt(req.body.aid,10);
       // console.log('Inside Ques get' + req.params.id);
        List.find({id:req.body.qid,'topCards.id':req.body.aid}).then((docs) => {
            // console.log('inside route', JSON.stringify(docs));
            docs[0].topCards.forEach(function (item){

              if(item.id === aid){
                  console.log(item);
                  res.send(item);
              }
            })

        }, (err) => {
          console.log("error",err)
            res.send('Cant get the docs', err);
        });
    },
    /* @pavithra K: add answer comments into db*/
    addanswerComment: function(req, res) {
      /*eslint-disable*/
      console.log('inside addanswer');
      console.log("AnswerID: "+req.body.answerId);
         let query = ' \
match (n),\
(u:user {emailid:"' + req.body.email + '" }) \
where id(n) = ' + req.body.answerId + ' \
create (m:comment{name:"' + req.body.content + '"}), \
(n)<-[:comment_of]-(m), \
(m)-[:commented_by{on : timestamp()}]->(u) \
return m';
/*eslint-enable*/
session.run(query).then(function(result) {
            // logger.debug(result);result.records[0]._fields[0].identity.low;
            console.log("answercomments",result);
            if (result) {
                let id = result.records[0]._fields[0].identity.low;
                console.log("ID:" + id);
                console.log("quesId:" + req.body.questionId);
                console.log("ansid:" + req.body.answerId);
               List.findOneAndUpdate({
                    id: req.body.questionId,
                    'topCards.id': req.body.answerId
                }, {
                    $push: {
                        'topCards.$.comment': {
                            id: id,
                            createdBy: req.body.email,
                            content: req.body.content,
                            createdOn: new Date().getTime(),
                            name: req.body.name
                        }
                    }
                }, {new: true}).then((doc) => {
                    console.log(doc);
                    res.send(doc);
                });
            } else {
                // logger.debug('error occurred');
                /*eslint-disable*/
                (err) => {
                    res.send(err);
                }
                /*eslint-enable*/
            }
        });
    },

       /* session.run(query).then(function(result) {
            // logger.debug(result);result.records[0]._fields[0].identity.low;
            console.log(result);
            res.send(result);
        });
    },*/
    inviteFrnds: function(req, res) {
        // router.post('/send', function handleSayHello(req, res) {
        // logger.debug(req.body.data);
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
        //  // let hashVID = bcrypt.hashSync(profile[0].local.verificationID, 10);
        //  let VID = profile[0].generateHashVID(profile[0].local.verificationID);
        //  /*eslint-enable */
        //  VIDcheck = VID;
        //  // let linkEmail = profile[0].generateHashEmail(profile[0].local.email);
        //  logger.debug(VID + ' is the VID');
        //  link = 'http://' + req.get('host') + '/users/verify?id=' + VID + '&email=' + profile[0].local.email;
        let link = 'http://' + req.get('host') + '/users/invited?email=' + req.body.mail;
        let text = 'Hello from \n\n' + req.body.data;
        let mailOptions = {
            from: 'geniegenie0001@gmail.com', // sender address
            to: req.body.mail, // list of receivers
            subject: 'Invitation from Zynla', // Subject line
            text: text,
            html: '<center><h1>Welcome to Zynla</h1></center><br><br><br>' + 'Hi,<br><br>This is the invitation to join in zynla.' + '<br><br><br><a href=' + link + ' style=background-color:#44c767 ;' + '-moz-border-radius:28px;-webkit-border-radius:28px;border-radius:28px;' + 'border:1px solid #18ab29 ;display:inline-block;padding:16px 31px;' + 'color:#ffffff ;text-shadow:0px 1px 0px #2f6627 ;' + 'text-decoration:none;> Join </a><br><br>'
        };
        // logger.debug(mailOptions + host);
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                // logger.debug(error);
                // logger.debug('Error')
            } else {
                // logger.debug('Message sent: ' + info.response);
                res.json({yo: info.response});
            }
        });
    },
    //router for updating likes and dislikes for question by sumit(5/3/2017)
    likeStatus: function(req, res) {
        var id = req.body.id;
        var email = req.body.email;
        var data = {
            'like': false,
            'unlike': false
        };
        let query = 'match (n:question)-[:liked]-(x:user) where id(n)=' + id + ' and x.emailid="' + email + '" return x;';
        session.run(query).then(function(result) {
            if (result) {
                if (result.records.length > 0) {
                    data.like = true;
                }
                query = 'match (n:question)-[:unliked]-(x:user) where id(n)=' + id + ' and x.emailid="' + email + '" return x;';
                session.run(query).then(function(result1) {
                    if (result1) {
                        if (result1.records.length > 0) {
                            data.unlike = true;
                        }
                        res.send(data);
                    }
                });
            } else {
                console.log("error in updating the like");
            }
        });
    },
    //router of updating like for question by sumit(3/3/2017)
   updateLike: function(req, res) {
      console.log('inside update like', req.body);
      var id = req.body.id;
      var email = req.body.email;
      let query = "";
      if (req.body.type == 'add') {
          query = 'match(n:question), \
                  (p:user {emailid:"' + email + '"})\
                  where id(n)=' + req.body.id + ' \
                  create (p)-[:liked]->(n) \
                ';
      } else {
          query = 'match(n:question)-[x:liked]- \
                  (p:user {emailid:"' + email + '"})\
                  where id(n)=' + req.body.id + ' \
                  delete x ;';
      }
      session.run(query).then(function(result) {
          if (result) {
              console.log('id', id);
              List.update(
                {
                  'id': id},{$set:{
                  'upVotes': req.body.upVotes
                  }
                }
          , function(docs) {
                  res.send("success");
              });
            } else {
              console.log("error in updating the like");
          }
      });
  },
  //router of updating unlike for question by sumit(4/3/2017)
 updateunlike: function(req, res) {
      var id = req.body.id;
      var email = req.body.email;
      let query = "";
      if (req.body.type == 'add') {
          query = 'match(n:question), \
                  (p:user {emailid:"' + email + '"})\
                  where id(n)=' + req.body.id + ' \
                  create (p)-[:disliked]->(n);';
      } else {
          query = 'match(n:question)-[x:disliked]- \
                  (p:user {emailid:"' + email + '"})\
                  where id(n)=' + req.body.id + ' \
                  delete x ;';
      }
      session.run(query).then(function(result) {
          if (result) {
              // console.log('id', id);
              List.update({
                  'id': id},{$set:{
                  'downVotes': req.body.downVotes
                }
              }, function(docs) {
                  res.send("success");
              });
          } else {
              // console.log("error in updating the like");
          }
      });
  },
    getImages: function(req, res) {
        let query = 'match(n:domain) return n.name';
        let arr = [];
        session.run(query).then(function(result) {
            console.log("result:" + result);
            for (let i in result.records) {
                if (i !== null) {
                    arr.push(result.records[i]._fields[0]);
                }
            }
            res.send(arr);
        }, function() {
            // console.log('error while connecting',err);
        });
    },
    // router for creating report created by Soundar
      createReport:function(req, res){
        let session = driver.session();
  let id = req.body.id;
  let email = req.body.email;
  let type = req.body.type;
  let query1 = 'match (n:user {emailid:"'+email+'"}),\
(q:question),\
(n)-[x:report]->(q) where id(q)=' + id + ' \
return x;';
//         let query = 'match (n:User {name:"'+email+'"}), \
// (q:Question) where id(q)=' + id + ' \
// create (n)-[:reports {type:"'+type+'",on:timestamp()}]->(q) \
// return q;';

session.run(query1).then(function(result) {
   // logger.debug(result);result.records[0]._fields[0].identity.low;
   if(result.records.length > 0)
   {
     session.close();
     res.send("Already Reported");
   }
   else {
     let query = 'match (n:user {emailid:"'+email+'"}), \
     (q:question) where id(q)=' + id + ' \
     create (n)-[:report {type:"'+type+'",on:timestamp()}]->(q) \
     return q;';
          session.run(query).then(function(result) {
            session.close();
            res.send("Reported...");
          });
   }

});
},
// router for checking whether the report is done created by Soundar
changePopup: function(req, res){
  let session = driver.session();
let id = req.body.id;
let email = req.body.email;
let query1 = 'match (n:user {emailid:"'+email+'"}),\
(q:question),\
(n)-[x:report]->(q) where id(q)=' + id + ' \
return x;';
//         let query = 'match (n:User {name:"'+email+'"}), \
// (q:Question) where id(q)=' + id + ' \
// create (n)-[:reports {type:"'+type+'",on:timestamp()}]->(q) \
// return q;';

session.run(query1).then(function(result) {
// logger.debug(result);result.records[0]._fields[0].identity.low;
if(result.records.length > 0)
{
session.close();
res.send(result.records[0]._fields[0].properties.type);
}
else {
  {
    res.send("First Report");
  }
}
});
}
};
module.exports = listController;
