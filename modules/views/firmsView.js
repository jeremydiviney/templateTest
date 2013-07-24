define(['text!templates/firmsView.txt','views/baseView','views/clientsView'],function (template,baseView,clientsView) {

    // View
    var firmsCollection = require('collections/firmsCollection');

    return baseView.extend({

        events: {

        },

        initializeView: function () {

              var that = this;
              this.setElement($("<table/>"));
              this.collection = new firmsCollection();

              this.collection.fetch();
              //console.log(template);

              this.compiledTemplate =  _.template(template);

        },

        render: function(){
//            //require(['views/clientsView'],function(){});
            //this.setElement($(this.compiledTemplate({models:this.collection.models,LV:this.loadSubView,that:this})));
            //console.log(this.$el.html());

        }

    });

});