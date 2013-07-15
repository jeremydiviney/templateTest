define(['text!templates/firmsView.txt'],function (template) {

    var firmModel = Backbone.Model.extend({

        defaults: {

        }

    });

    // View

    var view = Backbone.View.extend({

        events: {

        },

        initialize: function () {
             this.render();
        },

        render: function(){
            //require(['views/clientsView'],function(){});

            _.template(template,{testdata:"2121",LV:this.loadSubView});

        },

        loadSubView: function(requireView){

            //document.write(requireView);
            //alert("lksdjf");
            require([requireView],function(){
            });

        }

    });

    return view;

});