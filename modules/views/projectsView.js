define(['text!templates/projectsView.txt','views/baseView','collections/projectsCollection'],function (template,baseView,projectsColllection) {


    // View

    return baseView.extend({

        events: {

        },

        initialize: function () {
            var that = this;
            this.setElement($("<table/>"));
            this.collection = new projectsColllection();

            this.listenTo(this.collection,'sync',this.dataReady);

            this.collection.fetch();
            //this.collection.set([{"id":"p0","name":"Project Number 0","client":"cundefined"},{"id":"p1","name":"Project Number 1","client":"cundefined"},{"id":"p2","name":"Project Number 2","client":"cundefined"},{"id":"p3","name":"Project Number 3","client":"cundefined"},{"id":"p4","name":"Project Number 4","client":"cundefined"},{"id":"p5","name":"Project Number 5","client":"cundefined"},{"id":"p6","name":"Project Number 6","client":"cundefined"},{"id":"p7","name":"Project Number 7","client":"cundefined"},{"id":"p8","name":"Project Number 8","client":"cundefined"},{"id":"p9","name":"Project Number 9","client":"cundefined"},{"id":"p10","name":"Project Number 10","client":"cundefined"},{"id":"p11","name":"Project Number 11","client":"cundefined"},{"id":"p12","name":"Project Number 12","client":"cundefined"},{"id":"p13","name":"Project Number 13","client":"cundefined"},{"id":"p14","name":"Project Number 14","client":"cundefined"},{"id":"p15","name":"Project Number 15","client":"cundefined"},{"id":"p16","name":"Project Number 16","client":"cundefined"},{"id":"p17","name":"Project Number 17","client":"cundefined"},{"id":"p18","name":"Project Number 18","client":"cundefined"},{"id":"p19","name":"Project Number 19","client":"cundefined"},{"id":"p20","name":"Project Number 20","client":"cundefined"},{"id":"p21","name":"Project Number 21","client":"cundefined"},{"id":"p22","name":"Project Number 22","client":"cundefined"},{"id":"p23","name":"Project Number 23","client":"cundefined"},{"id":"p24","name":"Project Number 24","client":"cundefined"}]);

            this.compiledTemplate =  _.template(template);


        },

        render: function(){


            var el =   $(this.compiledTemplate({models:this.collection.models}));
            this.setElement(el);


        }

    });

});