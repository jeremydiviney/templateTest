define(['models/firmModel'],function(Model){

    return Backbone.Collection.extend({
        model: Model,
        //url: 'http://localhost:1222/data/firms',
        url: 'http://localhost:1222/data/firms',

        initialize: function(){
            console.log("Firms Collection");
        }
    });


});

