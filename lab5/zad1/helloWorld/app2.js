// Application using the 'Pug' template system
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

var express = require('express'),
    logger = require('morgan');
var fs = require('fs')
var app = express();
var x = 1;
var y = 2;
let math_it_up = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '/': function (x,y) {return x / y},
    ':': function (x,y) {return x / y},
    '*': function (x,y) {return x * y}
}
// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {      // The first route
    //res.render('index', {pretty:true}); // Render the 'index' view in 'pretty' mode — the resulting HTML code will be indented — the 'pretty' option has the 'deprecated' status — in the future it will not be supported
    let addResult = x + y;
    res.render('index', {result: `${x} + ${y} = ${addResult}`}); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
});

app.get('/json/:fileName', function(req, res){
    fs.readFile(`${__dirname}/json/${req.params.fileName}.json`, (err, data)=>{
        if (err){
            console.log(err);
            res.send(err)
        }
        else{
            let operations = JSON.parse(data);
            result = []
            for (op of operations.operations){
                op.result = math_it_up[op.op](op.x, op.y)
            }
            res.render('zad2', {operations: operations.operations})
        }
    })
})

app.get('/calculate/:operation/:x/:y', function(req, res){
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let op = req.params.operation;
    let opResult = math_it_up[op](x,y)
    res.render('index', {result: `${x} ${op} ${y} = ${opResult}`})
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db){
        if(err) throw err;
        let dbo = db.db("js-zad3");
        let toInsert = {op: op, x: x, y: y, res: opResult};
        dbo.collection("tmp").insertOne(toInsert, (err, res)=>{
            if(err) throw err;
            console.log("inserted");
            db.close();
        })
    })
})

app.get('/results', (req, res)=>{
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db){
        if(err) throw err;
        let dbo = db.db("js-zad3");
        dbo.collection("tmp").find({},{projection: {_id: 0}}).toArray((err, dbRes)=>{
            res.render('results', {results: dbRes});
            db.close();
        })
    })
})

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});