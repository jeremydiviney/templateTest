define(['models/clientModel'],function(Model){

    return Backbone.Collection.extend({
         model: Model,
        url: 'http://localhost:1222/data/clients',

        initialize: function(){
            console.log("Clients Collection");
        }
    });


});
