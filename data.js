exports.generateFirms = function(options) {

    //options.client = single record to return.
    //options.clients = number of records to return.
    //options.asObj = return as object instead of array.

    options = options || {};

    var i, firms = [];

    for (i=0; i<options.firms; i++) {



        firms.push({
            id: 'F' + i,
            name: 'Firm Number ' + i
        });



    }

    if (options.asObj) {
        firms = exports.asObj(firms, 'firms');
    }

    return firms;

};


exports.generateClients = function(options) {

    //options.client = single record to return.
    //options.clients = number of records to return.
    //options.asObj = return as object instead of array.

    options = options || {};

    var i, clients = [];

    for (i=0; i<options.clients; i++) {

        clients.push({
            id: 'c' + i,
            name: 'Client Number ' + i
        });


    }

    if (options.asObj) {
        clients = exports.asObj(clients, 'clients');
    }

    return clients;

};

exports.generateProjects = function(options) {

    // options.project = single record to return.
    // options.client = single client to return all projects for.
    // options.clients = number of clients to generate.
    // options.projects = number of records to generate.
    // options.asObj = return as object instead of array.

    options = options || {};

    var p, j, projects = [];

    for (p=0;p<options.projects;p++) {

        projects.push({
            id: 'p'  + p,
            name: 'Project Number ' + p,
            client: 'c' + options.client
        });


    }

    if (options.asObj) {
        projects = exports.asObj(projects, 'projects');
    }

    return projects;

};

exports.generateEntries = function(options) {

    options = options || {};

    var i, j, entries = [];

    // options.project = single record to return.
    // options.entry = single client to return all projects for.
    // options.projects = number of projects to generate.
    // options.entries = number of records to generate.
    // options.asObj = return as object instead of array.

    for (j=0; j<options.projects; j++) {

        if (!options.project || options.project == j) {

            for (i=0; i<options.entries; i++) {

                if (options.entry) {
                    options.entry = parseInt(options.entry, 10);
                }

                if (!options.entry || options.entry == ((j*options.entries)+i)) {

                    entries.push({
                        id: 'e' + ((j*options.entries)+i),
                        hours: Math.random() * 100,
                        rate: Math.random() * 200,
                        currency: '$',
                        project: 'p' + j
                    });

                }

            }

        }
    }

    if (options.asObj) {
        entries = exports.asObj(entries, 'entries');
    }

    return entries;

};

exports.generateTimers = function(options) {

    options = options || {};

    var i, timers = [];


    for (i=0; i<options.entries; i++) {

        if (!options.entry || options.entry == i) {

            if (Math.random() <= options.ratio) {

                timers.push({
                    id: 't' + i,
                    active: true,
                    entry: 'e' + i
                });

            }

        }

    }

    if (options.asObj) {
        timers = exports.asObj(timers, 'timers');
    }

    return timers;

};

exports.generateAll = function(numClients, numProjects, numEntries, numRatio) {

    var clients = exports.generateClients({ clients: numClients, asObj: true }).clients;
    var projects = exports.generateProjects({ clients: numClients, projects: numProjects, asObj: true }).projects;
    var entries = exports.generateEntries({ projects: numClients * numProjects, entries: numEntries, asObj: true }).entries;
    var timers = exports.generateTimers({ ratio: numRatio, entries: numClients * numProjects * numEntries, asObj: true }).timers;

    var item, parent;

    for(item in timers) {
        if (timers.hasOwnProperty(item)) {
            parent = entries[timers[item].entry];
            parent.timer = timers[item];
        }
    }

    for(item in entries) {
        if (entries.hasOwnProperty(item)) {
            parent = projects[entries[item].project];
            parent.entries = parent.entries || [];
            parent.entries.push(entries[item]);
        }
    }

    for(item in projects) {
        if (projects.hasOwnProperty(item)) {
            parent = clients[projects[item].client];
            parent.projects = parent.projects || [];
            parent.projects.push(projects[item]);
        }
    }

    clients = exports.asArr(clients);

    return { clients: clients };

};

exports.asObj = function(arr, key) {

    var i, max, response, obj = {};

    max = arr.length;
    for (i=0; i<max; i++) {
        obj[arr[i].id] = arr[i];
    }

    if (key) {
        response = {};
        response[key] = obj;
        return response;
    }

    return obj;

};

exports.asArr = function(obj) {

    var item, arr = [];

    for(item in obj) {
        if (obj.hasOwnProperty(item)) {
            arr.push(obj[item]);
        }
    }

    return arr;

};
