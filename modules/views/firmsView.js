define(['text!templates/firmsView.txt','views/baseView','views/clientsView'],function (template,baseView,clientsView) {

    // View
    var firmsCollection = require('collections/firmsCollection');

    return baseView.extend({

        events: {

        },

        initialize: function () {

              var that = this;
              this.setElement($("<table/>"));
              this.collection = new firmsCollection();

              this.listenTo(this.collection,'sync',function(){
                this.templateData = {models:this.collection.models};
                console.log(JSON.stringify(this.templateData));
                this.dataReady();
              });

              this.collection.fetch();
              //console.log(template);
              this.compiledTemplate =  _.template(template);

        },

        render: function(){
//            //require(['views/clientsView'],function(){});
            this.setElement($(this.compiledTemplate({models:this.collection.models,LV:this.loadSubView,that:this})));
            //console.log(this.$el.html());
            var cView = this.addSubView(clientsView,"clientView1",{});
            cView.render();
            this.$el.append(cView.$el);
             // this.$el.append(cView.$el);
        }

    });

});