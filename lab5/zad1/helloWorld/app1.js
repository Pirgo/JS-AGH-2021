// No use of any template system
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

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {     // The first route
    let result = x + y;
    res.send(`<h1>${x} + ${y} = ${result}</h1>`); // Send a response to the browser
})

app.get('/json/:fileName', function(req, res){
    fs.readFile(`${__dirname}/json/${req.params.fileName}.json`, (err, data)=>{
        if (err){
            console.log(err);
            res.status(404).send("404 not found")
        }
        else{
            let operations = JSON.parse(data);
            let response = `<table>
                            <tr> 
                            <td>x</td>
                            <td>Operation</td>
                            <td>y</td>
                            <td>Result</td>
                            </tr>`;
            for(op of operations.operations){
                response = response.concat(`<tr>
                                <td>${op.x}</td>
                                <td>${op.op}</td>
                                <td>${op.y}</td>
                                <td>${math_it_up[op.op](op.x, op.y)}</td>
                                </tr>`)
            }
            response = response.concat(`</table>`)
            res.send(`${response}`)
        }
    })
})

app.get('/calculate/:operation/:x/:y', function(req, res){
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let op = req.params.operation;
    let opResult = math_it_up[op](x,y)
    res.send(`${x} ${op} ${y} = ${opResult}`)
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
        let result = `<table>
                    <tr> 
                    <td>x</td>
                    <td>Operation</td>
                    <td>y</td>
                    <td>Result</td>
                    </tr>`;
        dbo.collection("tmp").find({},{projection: {_id: 0}}).toArray((err, dbRes)=>{
            for(doc of dbRes){
                result +=   `<tr>
                            <td>${doc.x}</td>
                            <td>${doc.op}</td>
                            <td>${doc.y}</td>
                            <td>${doc.res}</td>
                            </tr>`
            }
            result += `</table>`
            res.send(result)
            db.close();
        })
    })
})

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});