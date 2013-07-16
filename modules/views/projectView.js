define(['text!templates/projectsView.txt','collections/projectsCollection'],function (template,projectsColllection) {


    // View

    var view = Backbone.View.extend({

        events: {

        },

        initialize: function () {
            var that = this;
            this.setElement($("<table/>"));
            this.collection = new projectsColllection();

            this.listenTo(this.collection,'sync',this.dataReady);

            this.collection.fetch({
                success:function(collection,response,options){console.log(response);},
                error: function(collection,response,options){console.log(response)}
            });
        },

        render: function(){
            this.$el.html(_.template(template,{models:this.collection.models}));
        }

    });

    return view;

});