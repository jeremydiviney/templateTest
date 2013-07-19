define(['text!templates/clientsView.txt','views/baseView','views/projectsView','collections/clientsCollection'],function (template,baseView,projectsView,clientsCollection) {

    // View
    return baseView.extend({

        events: {

        },

        initialize: function () {

            var that = this;
            this.setElement($("<table/>"));      //////////////////////////
            this.collection = new clientsCollection();

            this.listenTo(this.collection,'sync',function(){
                this.templateData = {models:this.collection.models};
                //console.log(JSON.stringify(this.templateData));
                this.dataReady();
            });

            this.collection.fetch();

            this.compiledTemplate =  _.template(template);

        },

        render: function(){

            this.setElement($(this.compiledTemplate({models:this.collection.models})));
            var pView = this.addSubView(projectsView,"projectView1",{});
            pView.render();
            this.$el.append(pView.$el);
        }

    });


});