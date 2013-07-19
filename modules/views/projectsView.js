define(['text!templates/projectsView.txt','views/baseView','collections/projectsCollection'],function (template,baseView,projectsColllection) {


    // View

    return baseView.extend({

        events: {

        },

        initialize: function () {
            var that = this;
            this.setElement($("<table/>"));
            this.collection = new projectsColllection();

            this.listenTo(this.collection,'sync',function(){
                this.templateData = {models:this.collection.models};
                this.dataReady();
            });

            this.collection.fetch();

            this.compiledTemplate =  _.template(template);

        },

        render: function(){


            var el =  $(this.compiledTemplate({models:this.collection.models}));
            this.setElement(el);


        }

    });

});