define(['text!templates/clientsView.txt'],function (template) {

    var clientModel = Backbone.Model.extend({

        defaults: {

        }

    });

    // View

    var view = Backbone.View.extend({

        events: {

        },

        initialize: function () {

        },

        render: function(){
            _.template(template,{testdata:"2121",LV:this.loadSubView});

        }

    });

    return view;

});