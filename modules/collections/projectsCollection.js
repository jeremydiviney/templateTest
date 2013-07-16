define(['models/projectModel'],function(Model){

    return Backbone.Collection.extend({
        model: Model,
        url: 'http://localhost:1222/data/projects',

        initialize: function(){
            console.log("Projects Collection");
        }
    });


});

