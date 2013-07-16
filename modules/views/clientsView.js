define(['text!templates/clientsView.txt','views/projectView','collections/clientsCollection'],function (template,projectsView,clientsCollection) {

    // View

    var view = Backbone.View.extend({

        events: {

        },

        initialize: function () {
            var that = this;
            this.setElement($("<table/>"));
            this.collection = new clientsCollection();

            this.listenTo(this.collection,'sync',this.dataReady);

            this.collection.fetch({
                success:function(collection,response,options){console.log(response);},
                error: function(collection,response,options){console.log(response)}
            });
        },

        render: function(){
            this.$el.html(_.template(template,{models:this.collection.models}));
            var pView = new projectsView();
            pView.render();
            this.$el.append(pView.$el);
        }

    });

    return view;

});