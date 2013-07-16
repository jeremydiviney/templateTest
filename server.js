var express = require('express');
var consolidate = require('consolidate');
var Handlebars = require('handlebars');
var request = require('request');
var fs = require('fs');
var requirejs = require('requirejs');
var _ =  global._ = require('lodash');

var jsdom = require('jsdom').jsdom

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

// Register Handlebar Partial Templates
//var partials = __dirname + '/public/templates/partials/';
//fs.readdirSync(partials).forEach(function(file) {
//    var source = fs.readFileSync(partials + file, 'utf8');
//    var partial = /(.+)\.html/.exec(file).pop();
//    Handlebars.registerPartial(partial, source);
//});
//
//Handlebars.registerHelper('multiply', function(a, b) {
//    return (a * b).toFixed(2);
//});
//
//Handlebars.registerHelper('2digit', function(a) {
//    return a.toFixed(2);
//});


//Handlebars.registerHelper('lv', function(module) {
//
//    var view = requirejs('public/' + module);
//    var instance = new view;
//
//    var template = Handlebars.compile(instance.template);
//    var data = instance.data();
//
//    return new Handlebars.SafeString(template(data));
//
//});


app.get('/*', function(req, res,next) {
    //res.write("aadxxxxxxxxxvcvvvvvvvdbbbbbaaa");
    //res.end();
    res.contentType("text/html");
    next();
});

app.get('/firms', function(req, res) {

      var view = requirejs('views/firmsView');
//    //res.json(Backbone);
     var v = new view();
     //v.render();

    v.serverRender(function(html){

        //html.append($("<h1>test passes</h1>"));

        //html.append("<h3>second test passes</h3>");
        res.send(html.outerHTML())
            res.end();
        });

    res.end();



});

var numFirms = 10;
var numClients = 50;
var numProjects = 5;
var numEntries = 20;
var numTimers = .4;

//app.get('/gettest', function(req, res) {
//
//    preprocessor.start([
//        ["clients", "http://localhost:" + port + "/data/clients"],
//        ["projects", "http://localhost:" + port + "/data/projects"],
//        ["entries", "http://localhost:" + port + "/data/entries"],
//        ["timers", "http://localhost:" + port + "/data/timers"]
//    ], function(data) {
//        res.json(data);
//    });
//
//});

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
        clients: numClients,
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


$.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : $("<p>").append(this.eq(0).clone()).html();
};
