var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

// require('request-debug')(request);
var app = express();
console.log(__dirname + '/app');
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dbUrl = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ds037205.mongolab.com:37205/japanese-items';
var myDb;

MongoClient.connect(dbUrl, {db: {logger : console} }, function(err, db) {
    if (err) {
        console.log("DATABASE PROBLEM!");
    }

    myDb = db;
});

app.get('/saved/', function(req, res, next) {
    if (myDb) {
        var saved = myDb.collection('saved');
        saved.find().toArray(function(err, items) {
            if (err) { console.log(err); }
            res.send(items);
        });
    } else {
        res.send([]);
    }
});

app.post('/saved/list/new', function(req, res, next) {
    var newList = { name : req.body.name,
                    elements : []};
    myDb.collection('saved').insert(newList, {w:1}, function(err, result) {
        res.send(result);
    });
});

app.post('/saved/list/delete', function(req, res, next) {
    myDb.collection('saved').deleteOne(
        {"_id" : new ObjectID(req.body.id) },
        function(err, result) {
            if (err) { console.log(err); }
            res.send(result);
        });
});

app.post('/saved/item/new', function(req, res, next) {
    myDb.collection('saved').updateOne(
        { _id : new ObjectID(req.body.listId) },
        { $push : { elements : req.body.element } },
        function(err, result) {
            if (err) { console.log(err); };
            res.send(result);
        });
});

app.post('/saved/item/delete', function(req, res, next) {
    myDb.collection('saved').updateOne(
        { _id : new ObjectID(req.body.listId) },
        { $pull : { elements : req.body.element }},
        function(err, result) {
            res.send(result);
        });
});

app.get('/jishoapi/:query', function(req, res, next) {
    var apiURL = 'http://jisho.org/api/v1/search/words?keyword=' + encodeURIComponent(req.params.query);
    request.get(apiURL).pipe(res);
});

app.listen(process.env.PORT || 3000);
