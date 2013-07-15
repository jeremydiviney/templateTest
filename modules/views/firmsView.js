define(['text!templates/firmsView.txt','views/clientsView'],function (template,clientsView) {

    var firmModel = Backbone.Model.extend({

        defaults: {

        }

    });

    // View

    var view = Backbone.View.extend({

        events: {

        },

        initialize: function () {
              this.setElement($("<div/>"));



        },

        render: function(){
//            //require(['views/clientsView'],function(){});
              this.$el.html(_.template(template,{testdata:"2121",LV:this.loadSubView}));

              var cView = new clientsView({});



//            this.$el.html();

        },

        serverRender: function(cB){


            //cB(this.$el.html());
            //callBack("lskdjf");

//            if(true){
                this.render();
            cB(this.$el);
//            }


        },

        loadSubView: function(requireView){

            //document.write(requireView);
            //alert("lksdjf");
            require([requireView]);

        }

    });

    return view;

});