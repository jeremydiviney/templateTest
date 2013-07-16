define(['text!templates/firmsView.txt','views/clientsView'],function (template,clientsView) {

    // View
    var firmsCollection = require('collections/firmsCollection');

    var view = Backbone.View.extend({

        events: {

        },

        initialize: function () {
              var that = this;
              this.setElement($("<table/>"));
              this.collection = new firmsCollection();

              this.listenTo(this.collection,'sync',this.dataReady);

              this.collection.fetch({
                  success:function(collection,response,options){console.log(response);},
                  error: function(collection,response,options){console.log(response)}
              });

        },


        render: function(){
//            //require(['views/clientsView'],function(){});
            this.setElement($(_.template(template,{models:this.collection.models})));
            console.log(this.$el.html());
            //  var cView = new clientsView();
             // cView.render();
             // this.$el.append(cView.$el);
        },

        dataReady: function(){

            this.render();
            this.trigger("renderComplete");

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