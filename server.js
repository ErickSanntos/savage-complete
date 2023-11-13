const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection; // ??? the way you sort things 

const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const dbName = "demo";

app.listen(3000, () => { // creates a server express needs to listen to 
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => { // port 3000 
        if(error) {
            throw error; // errors catch 
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public')) // i think its the server not sure maby cloud 

app.get('/', (req, res) => { // get we are creating something 
  db.collection('messages').find().sort({thumbUp: -1}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => { // we are posting something 
  console.log(req)
  db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      
      thumbUp: req.body.subtract ? req.body.thumbUp - 1 : req.body.thumbUp + 1,
      
    }
    
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => { // we are removing items or elements 
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
