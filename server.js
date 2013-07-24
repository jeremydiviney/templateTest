var express = require('express');
var consolidate = require('consolidate');
var Handlebars = require('handlebars');
var request = require('request');
var fs = require('fs');
var requirejs = require('requirejs');
var _ =  global._ = require('lodash');

//var jsdom = require('jsdom').jsdom

var $ = global.jQuery = global.$ = require('jquery').create();
var jQuery = $;

global.Backbone = require('backbone');

var app = express();


var port = process.env.PORT || 1222;

// Configure RequireJS
requirejs.config({
    baseUrl: __dirname + '/modules',
    nodeRequire: require
});




console.log(__dirname);

var data = require('./data.js');
//var preprocessor = require('./preprocessor.js');
//var map = require('./map.js');

//app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/templates');

app.use(express.static(__dirname + '/public'));

app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.cookieParser());
});


app.get('/*', function(req, res,next) {
    //res.write("aadxxxxxxxxxvcvvvvvvvdbbbbbaaa");
    //res.end();
    res.contentType("text/html");
    next();
});


app.get('/page', function(req, res) {

    var view = requirejs('views/baseView');
    var template = requirejs('text!templates/pageView.txt');
//    //res.json(Backbone);
    var v = new view({id:"pageView1",template:template});
    //v.render();

    v.serverRender(function(html){
        res.send(html)
        res.end();
    });

});


app.get('/firms', function(req, res) {

      var view = requirejs('views/firmsView');
//    //res.json(Backbone);
     var v = new view({id:"firmView1"});
     //v.render();

    v.serverRender(function(html){
        res.send(html)
            res.end();
        });
});

app.get('/clients', function(req, res) {

    var view = requirejs('views/clientsView');
//    //res.json(Backbone);
    var v = new view({id:"clientsView1"});
    //v.render();

    v.serverRender(function(html){
        res.send(html)
        res.end();
    });
});

app.get('/projects', function(req, res) {

    var view = requirejs('views/projectsView');
//    //res.json(Backbone);
    var v = new view({id:"projectsView1"});
    //v.render();

    v.serverRender(function(html){
        res.send(html)
        res.end();
    });
});

var numFirms = 4;
var numClients = 3;
var numProjects = 12;
var numEntries = 20;
var numTimers = .4;



app.get('/data/firms', function(req, res) {

    var results = data.generateFirms({
        firm: req.query.firm,
        firms: numFirms,
        asObj: req.query.obj
    });

    res.json(results);

});



app.get('/data/clients', function(req, res) {

    var results = data.generateClients({
        client: req.query.client,
        clients: numClients,
        asObj: req.query.obj
    });

    res.json(results);

});

app.get('/data/projects', function(req, res) {

    res.json(data.generateProjects({
        client: req.query.client,
        project: req.query.project,
        projects: numProjects,
        asObj: req.query.obj
    }));

});

app.get('/data/entries', function(req, res) {
    res.json(data.generateEntries({
        project: req.query.project,
        entry: req.query.entry,
        projects: numClients * numProjects,
        entries: numEntries,
        asObj: req.query.obj
    }));
});

app.get('/data/timers', function(req, res) {
    res.json(data.generateTimers({
        ratio: numTimers,
        entries: numClients * numProjects * numEntries,
        entry: req.query.entry,
        asObj: req.query.obj
    }));
});

app.get('/data/all', function(req, res) {

    res.json(data.generateAll(numClients, numProjects, numEntries, numTimers));
});

app.get('*', function(req, res) {
    res.send(404, 'File not found.');
});

app.listen(port);
console.log('Listening on Port ' + port + '.');

console.log = function(){};


