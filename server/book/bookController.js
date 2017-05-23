'use strict';

let driver = require('../config/neo4j');
let session = driver.session();
const bookDoc = require('./bookEntity');
const tocDoc = require('./tocEntity');
const redis = require('redis');
const client = redis.createClient();
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
//const ImageModule = require('docxtemplater-image-module');

const fs = require('fs');
const path = require('path');

//Load the docx file as a binary
//let context = fs.readFileSync(path.resolve(__dirname, '../../BookDocs/input.docx'), 'binary');

let bookController = {
    updateRating: function(req, res) {
        tocDoc.update({
            id: req.body.id
        }, {
            $set: {
                'rating': req.body.rating
            }
        }).then((docs) => {
            if (docs)
            {
                res.send(docs)
              }
            else {
                res.send("unable to give rating")
            }
        }, (err) => {
            console.log(err);
        })

    },
    // updateLikes: function(req, res) {
    //     console.log(JSON.parse(req.body.likes));
    //     if (JSON.parse(req.body.likes).includes(req.body.email)) {
    //         let query = 'match (toc:toc)<-[liked:liked]-(user:user)
    // where id(toc)=' + req.body.id + ' and user.emailid="'
    // + req.body.email + '" delete liked '
    //         console.log("if", query);
    //         session.run(query).then(function(result) {
    //             tocDoc.update({
    //                 _id: req.body._id
    //             }, {
    //                 $pop: {
    //                     "likes": req.body.email
    //                 }
    //             }).then((docs) => {
    //                 if (docs)
    //                     res.send(docs)
    //                 else {
    //                     res.send("unable to unliked")
    //                 }
    //             }, (err) => {
    //                 console.log(err);
    //             })
    //         })
    //     } else {
    //         console.log("else");
    //         let query = 'match (toc:toc) ,(user:user) where id(toc)=' + req.body.id + '
    // and user.emailid="' + req.body.email + '" merge (user)-[:liked]->(toc) '
    //         console.log(query);
    //         session.run(query).then(function(result) {
    //             console.log(result["summary"]["counters"]["_stats"]["relationshipsCreated"]);
    //             if (result["summary"]["counters"]["_stats"]["relationshipsCreated"] > 0) {
    //                 console.log({
    //                     _id: req.body._id
    //                 }, {
    //                     $addToSet: {
    //                         "likes": req.body.email
    //                     }
    //                 });
    //                 tocDoc.update({
    //                     _id: req.body._id
    //                 }, {
    //                     $addToSet: {
    //                         "likes": req.body.email
    //                     }
    //                 }).then((docs) => {
    //                     if (docs)
    //                         res.send(docs)
    //                     else {
    //                         res.send("error in updating the likes")
    //                     }
    //                 }, (err) => {
    //                     console.log("errrorrr");
    //                     res.send(err)
    //                 })
    //             }
    //         })
    //     }
    // },
    getTocs: function(req, res) {
        console.log("inside me")
        tocDoc.find().then((docs) => {
            res.send(docs);
        }, (err) => {
            res.send(err);
        });
    },
    checkdatas: function(req, res) {
        console.log("checkdatas");
        bookDoc.find().then((docs) => {

            res.send(docs);
        }, (err) => {
            res.send(err);
        });

    },

    getDomainTocs: function(req, res) {
        let domain = req.body.domain;
        console.log("inside me")
        tocDoc.find({"toc.Domain": domain}).then((docs) => {
            res.send(docs);
            console.log(docs);
        }, (err) => {
            res.send(err);
        });
    },
    saveToc: function(req, res) {
        console.log("inside bookController")
        // res.send("success entry")
        let template = req.body.template;
        let chapterData = JSON.parse(req.body.book);
        /* eslint-disable */
        let domain = chapterData[0]["Domain"];
        /* eslint-enable */
        //let author = req.body.username;
        let email = req.body.author;
        let title = ''
        /* eslint-disable */
        if(req.body.title===undefined)
    {

             title = chapterData[0]["titles"];
        }
            /* eslint-enable */
        else{
           title = req.body.title
        }

        console.log(title);
        let newDate = new Date();
            /* eslint-disable */
        let date = (newDate.getMonth() + 1) + "/" + newDate.getDate() + "/" + newDate.getFullYear();
    /* eslint-enable */
        console.log(date)
            /* eslint-disable */
        let query = "\
                    match (n:domain),\
                    (u:user) where n.name='" + domain + "'\
                    and u.emailid='" + req.body.author + "'\
                    merge (t:toc {toc:'" + JSON.stringify({chapterData: chapterData}) + "'}) \
                    merge (t)<-[r:posted]-(u) \
                    ON CREATE  set r.timestamp=" + date + "\
                     merge (t)-[:toc_of]->(n) return t";
                         /* eslint-enable */
        //   console.log(query)
        session.run(query).then(function(result) {
            /*eslint-disable*/
            let topicname;
            let subTopicname;
            console.log(query);
            console.log("toc query");
            session.close()
            console.dir(result.records.length, "length")
            if (result.summary.counters._stats.nodesCreated = 1) {
                let id = result.records[0]._fields[0]["identity"]["low"];
                let toc = new tocDoc({author: req.body.author, timestamp: date, id: id, toc: chapterData})
                toc.save().then((doc) => {
                    //creating book
                    chapterData.forEach((chapter, chapterIndex, chapterArr) => {
                        if (chapter.hasOwnProperty('name')) {
                            //to set toc name and domain
                            let query = 'match (n) where id(n)=' + id + ' set n.name="' + chapter.name + '",n.domain="' + chapter.domain + '"';
                            session.run(query).then(function(result) {
                                console.log("toc1 query");
                                if (result) {}
                                session.close()
                                console.log("toc1 query close");
                            })
                        } else {
                            chapterArr[chapterIndex]["Chapter"].forEach((topic, topicIndex, topicArr) => {
                                let chapterId;
                                if (topic.hasOwnProperty('name')) {
                                    topicname = topic.name;
                                } else {
                                    topicArr[topicIndex]["Topic"].forEach((subTopic, subTopicIndex, subTopicArr) => {
                                        let topicId;
                                        if (subTopic.hasOwnProperty('name')) {
                                            subTopicname = subTopic.name;
                                        } else {

                                            let query = '\
                           match (concept:concept{name:"' + subTopicArr[subTopicIndex]["Subtopic"] + '"}),(topicname:concept{name:"' + topicname + '"}),(subTopicname:concept{name:"' + subTopicname + '"}),\
                           (toc:toc) where id(toc)=' + id + '\
                               merge (chapter:chapter{name:"' + topicname + '"})-[:chapter_of]->(toc) \
                               merge (topic:topic{name:"' + subTopicname + '"})-[:topic_of]->(chapter) \
                               merge (subtopic:subtopic{name:"' + subTopicArr[subTopicIndex]["Subtopic"] + '"})-[:topic_of]->(topic) \
                               merge  (subtopic)-[:concept]->(concept)  \
                               merge  (topic)-[:concept]->(subTopicname)\
                               merge  (chapter)-[:concept]->(topicname) with concept\
                               match (concept)-[r]-(:question)-[:answer_of]-(m)\
                                where (m:text) or (m:blog)or (m:video)\
                                 with  {intent:type(r),value:collect({label:labels(m)[0],value:m.value})}  as value  \
                                match (topicname:concept{name:"' + topicname + '"})-[rrr]-(:question)-[:answer_of]-(n)\
                                   where (n:text) or (n:blog)or (n:video)\
                                    with  {intent:type(rrr),value:collect({label:labels(n)[0],value:n.value})} as conceptvalue ,value as value \
                                    match (subTopicname:concept{name:"' + subTopicname + '"})-[rr]-(:question)-[:answer_of]-(l)\
                                    where (l:text) or (l:blog)or (l:video)\
                                     with  {intent:type(rr),value:collect({label:labels(l)[0],value:l.value})} as subtopicvalue,conceptvalue as conceptvalue ,value as value\
                                    return collect(value) ,collect(conceptvalue),collect(subtopicvalue),"'+topicname+'","'+subTopicname+'"'
                              ;
                                            console.log(query)
                                            session.run(query).then(function(result) {
                                                /*eslint-disable*/
                                                console.log(subTopicname, topicname);

                                                let newSubTopicArr = []
                                                newSubTopicArr.push({name: subTopicArr[subTopicIndex]["Subtopic"]
                                                })
                                                newSubTopicArr.push.apply(newSubTopicArr, result.records[0]._fields[0])
                                                subTopicArr[subTopicIndex]["Subtopic"] = newSubTopicArr
                                                let newtopicArr = [];
                                                newtopicArr.push({name: result.records[0]._fields[4]})
                                                console.log(newtopicArr,"newtopicArr",{name: subTopicname});
                                                newtopicArr.push.apply(newtopicArr, result.records[0]._fields[2])
                                                subTopicArr[0] = {
                                                    content: newtopicArr
                                                }
                                                let newConceptArr = [];
                                                newConceptArr.push({name: result.records[0]._fields[3]})
                                                console.log(newConceptArr,"newConceptArr",{name: topicname});
                                                newConceptArr.push.apply(newConceptArr, result.records[0]._fields[1])
                                                topicArr[0] = {
                                                    content: newConceptArr
                                                };
                                                // console.log("newConceptArr",result.records[0]._fields[2]);
                                                if (chapterArr.length == (chapterIndex + 1) && topicArr.length == (topicIndex + 1) && subTopicArr.length == (subTopicIndex + 1))
                                                    //  res.send(chapterData)
                                                session.close()
                                                if (chapterArr.length == (chapterIndex + 1) && topicArr.length == (topicIndex + 1) && subTopicArr.length == (subTopicIndex + 1)) {

                                                    let book = new bookDoc({author: "aqib", timestamp: 1, id: 1, book: chapterData})
                                                    book.save()

                                                    let output = 'output'
                                                    let path = '../../BookDocs/pdf/output.pdf'
                                                    query = "match (n:toc) where id(n)= " + id + " create (b:book{path:'" + path + "'}) merge (b)-[:book_of]->(n) return n,b"
                                                    //    console.log(query);
                                                    session.run(query).then(function(result) {
                                                        /*eslint-disable*/
                                                        // console.log(result.summary.counters._stats.nodesCreated,"inside query");
                                                        session.close()
                                                        if (result) {
                                                            if (req.body.type === 'editedbook') {
                                                                let bookData = JSON.parse(req.body.editedbook)
                                                                te(bookData, req.body.username, res, req.body.type, email,template);
                                                            } else {
                                                                addTemplate(JSON.stringify(chapterData), req.body.username, res, req.body.type, email,template);
                                                            }

                                                        }
                                                    })
                                                    console.log("end");
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }, (err) => {
                    console.log(err)
                });
            }
        });

    },

    getDomains: function(req, res) {
        client.smembers("domain", (error, reply) => {
            if (error) {
                console.log(error)
                res.send(error)
            } else {
                res.send(reply);
            }
        })
    }
}

let addTemplate = function(x, username, res, type, email,template) {
    let chapterData = x;
    let context = fs.readFileSync(path.resolve(__dirname, template), 'binary');
    console.log("getting into addTemplate")
    var datas = {
        d: chapterData
    };
    console.log(datas.d);
    var arr = JSON.parse(datas.d);
    console.log(arr);
    let finalJSON = {
        DOMAINNAME: '',
        BOOKTITLE: '',
        USERNAME: '',
        Chapters: []
    };
    let chapterArray = [];
    arr.forEach((book, bookIndex, bookArr) => {
        if (book.hasOwnProperty('name')) {
            finalJSON.DOMAINNAME = bookArr[bookIndex]["Domain"].toUpperCase();
                finalJSON.BOOKTITLE = bookArr[bookIndex]["title"].toUpperCase();
            finalJSON.USERNAME = username;
            console.log("DOMAIN_NAME:", finalJSON.DOMAIN_NAME, "BOOKTITLE:", finalJSON.BOOKTITLE, "USERNAME:", finalJSON.USERNAME);
        } else {
            let Chap = {};
            Chap.chno = bookIndex;
            console.log('chapter index......', Chap.chno)
            bookArr[bookIndex]["Chapter"].forEach((Chapter, chapterIndex, chapterArr) => {
                let topArray = [];
                if (Chapter.hasOwnProperty('content')) {
                    let intents = []
                    chapterArr[chapterIndex]["content"].forEach((content, contentIndex, contentArray) => {
                        if (content.hasOwnProperty('name')) {
                            let chname = contentArray[contentIndex]["name"];
                            console.log('oooooooooooooooooooo')
                            console.log(chname)
                            Chap.ChapterName = chname.charAt(0).toUpperCase() + chname.substr(1, chname.length).toLowerCase();
                            console.log(Chap.ChapterName)
                        } else {
                            let intent = {};
                            let intentlbl=contentArray[contentIndex]["intent"];
                            intent.intent_label = intentlbl.charAt(0).toUpperCase()+intentlbl.substr(1,intentlbl.length).toLowerCase();
                            let intentValue = []
                            contentArray[contentIndex]["value"].forEach((value, valueIndex, valueArray) => {
                                let intentVal = {}
                                let label1 = value['label'];
                                intentVal.label = label1.charAt(0).toUpperCase()+label1.substr(1,label1.length).toLowerCase();
                                intentVal.value = value['value'];
                                intentValue.push(intentVal);
                            })
                            intent.intent_value = intentValue
                            intents.push(intent);
                        }
                    });
                    Chap.intents = intents;
                } else { //else
                    let top = {}
                    top.topicno = chapterIndex;
                    console.log('topicIndex', chapterIndex)
                    chapterArr[chapterIndex]["Topic"].forEach((topic, topicIndex, topicArr) => {
                        let subTopicArray = []
                        let subtop = {};
                        let intents = []
                        if (topic.hasOwnProperty('content')) {
                            topicArr[topicIndex]["content"].forEach((content, contentIndex, contentArr) => {
                                if (content.hasOwnProperty('name')) {
                                    let tname = contentArr[contentIndex]["name"];
                                    console.log('pppppppppppppppppppppppppppppp')
                                    console.log(tname)
                                    top.TopicName = tname.charAt(0).toUpperCase() + tname.substr(1, tname.length).toLowerCase();
                                    console.log("topicname:", top.TopicName);
                                } else {
                                    let intent = {};
                                    intent.intent_label = contentArr[contentIndex]["intent"];
                                    console.log("intent_value:", intent.intent_label);
                                    let intentValue = []
                                    contentArr[contentIndex]["value"].forEach((value, valueIndex, valueArray) => {
                                        let intentVal = {}
                                        let label1=value['label'];
                                        intentVal.label = label1.charAt(0).toUpperCase()+label1.substr(1,label1.length).toLowerCase()
                                        intentVal.value = value['value']
                                        intentValue.push(intentVal)
                                    });
                                    intent.intent_value = intentValue
                                    intents.push(intent)
                                }
                            });
                            top.intents = intents
                        } else { //else
                            let SubTopicName
                            let subtopicno
                            topicArr[topicIndex]["Subtopic"].forEach((subtopic, subtopicIndex, subtopicArr) => {
                                let intent = {};
                                if (subtopic.hasOwnProperty('name')) {
                                    let stname = subtopicArr[subtopicIndex]["name"];
                                    SubTopicName = stname.charAt(0).toUpperCase() + stname.substr(1, stname.length).toLowerCase();
                                    subtopicno = subtopicIndex + 1;
                                } else {
                                    intent.intent_label = subtopicArr[subtopicIndex]["intent"];
                                    console.log('intent....', intent.intent_label)
                                    let intentValue = []
                                    subtopicArr[subtopicIndex]["value"].forEach((value, valueIndex, valueArray) => {
                                        let intentVal = {}
                                        let label1 = value['label'];
                                        intentVal.label = label1.charAt(0).toUpperCase()+label1.substr(1,label1.length).toLowerCase();
                                        intentVal.value = value['value']
                                        intentValue.push(intentVal)
                                    });
                                    intent.intent_value = intentValue
                                }
                                if (intent.intent_label !== undefined)
                                    intents.push(intent)
                            })
                            subtop.intents = intents
                            subtop.SubTopicName = SubTopicName
                            subtop.subtopicno = subtopicno
                            subTopicArray.push(subtop)
                            console.log('subtopic......', subtop)
                            top.subtopic = subTopicArray;
                        }
                    });
                    topArray.push(top)
                    Chap.Topic = topArray;
                    console.log('topics..........', top);
                }
            });
            console.log('chapters............', Chap)
            chapterArray.push(Chap)
        }
    });
    finalJSON.Chapters = chapterArray
    console.log(finalJSON);
    var zip = new JSZip(context);
    var docx = new Docxtemplater().loadZip(zip).setData(finalJSON).render();
    var buffer = docx.getZip().generate({type: "nodebuffer"});
    fs.writeFile(path.resolve(__dirname, '../../BookDocs/output.docx'), buffer);
    return savePDF(x, res, type, username, finalJSON.BOOKTITLE, email);
}
let savePDF = function(x, res, type, username, title, email) {
    // var book1 = req.body.book;
    var unoconv1 = require('child_process').exec;
    //var cmd1='mv test1.docx test1.doc';
    var cmd = 'unoconv -f pdf -o BookDocs/pdf/' + email + '/' + title + '.pdf BookDocs/output.docx';
    console.log("yup")
    unoconv1(cmd, function(error, stdout, stderr) {
        console.log("yeh")
        if (error === null) {
            // session.run(query).then(function(result) {
            //     /*eslint-disable*/
            //     session.close()
            if (type === "editedToc")
                res.send({data:x,path:email + '/' + title + '.pdf'})
            else {
              //  console.log(''../../../BookDocs/pdf/" + email + '/' + title + '.pdf');
                res.send( email + '/' + title + '.pdf');
            }

            console.log("success");

        }

    });

}
module.exports = bookController;
