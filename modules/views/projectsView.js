define(['text!templates/projectsView.txt','views/baseView','collections/projectsCollection'],function (template,baseView,projectsColllection) {


    // View

    return baseView.extend({

        events: {

        },

        initializeView: function () {
            var that = this;
            this.setElement($("<table/>"));
            this.collection = new projectsColllection();

            this.collection.fetch();

            //console.log("compiling template");
            this.compiledTemplate =  _.template(template);

        },

        render: function(){

//            var el =  $(this.compiledTemplate({models:this.collection.models}));
//            this.setElement(el);

        }

    });

});