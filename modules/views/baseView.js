define([],function () {

    return Backbone.View.extend({

        dataReady: function(){

            //console.log("dataReady"  + this.id);
            console.log(JSON.stringify(this.collection.models))
            this.render();
            this._renderComplete = true;
            this.renderTreeCheck();

        },

        renderTreeCheck: function(){

            var renderComplete = false;
            console.log("renderTreeCheck" + this.id);
            if(this._renderComplete === true){
                renderComplete = true;
                //console.log("render checking subView ... count:" + _.size(this.childViews));
                for(var tmpId in this.childViews){
                    //console.log("render checking..." + this.childViews[tmpId] + " : " + this.childViews[tmpId]._renderComplete);
                    if(!this.childViews[tmpId]._renderComplete){
                        renderComplete = false;
                    }

                }

            }

            if(renderComplete){
                console.log("renderComplete" + this.id);
                this.trigger("renderComplete");

            }


        },

        addSubView: function(viewConstructor,viewId,options){
            var tmpView;
            this.childViews =  this.childViews || {};
            options = options || {};

            options.id =   options.id || viewId || "_" + this.id + "_" +  "subView" + _.size(this.childViews);

            //console.log("pre create check.. " + options.id + " " + _.size(this.childViews) );

            if(!this.childViews[options.id]){

                console.log("Creating.. " + options.id );

                tmpView= new viewConstructor(options);
                this.childViews[options.id] = tmpView;

                this.listenTo(this.childViews[options.id],"renderComplete",function(){
                    this.renderTreeCheck();
                });

                this.listenTo(this.childViews[options.id],"elementChange",function(stuff){
                    console.log("replacing... " + stuff.oldEl.html());
                    stuff.oldEl.replaceWith(this.childViews[options.id].$el);
                });

            }

            return this.childViews[options.id];

        },

        removeSubView: function(viewId){

            if(this.childViews[viewId]){
                //this.childViews[viewId].remove();
                this.childViews[viewId] = null
            }

        },

        removeSubViews: function(){

            for(var tmp in this.childViews){
                removeSubView(tmp.id);
            }


        },

        loadSubView: function(requireView){

            //document.write(requireView);
            //alert("lksdjf");
            require([requireView]);

        },

        serverRender: function(cB){

            var that = this;

            console.log("sldkjfsldkfjklsdjf1");
            this.listenTo(this,"renderComplete",function(){
                console.log("sldkjfsldkfjklsdjf2");
                cB(that.$el);
            });

            this.render();
            //this.dataReady();

        }

    });


});
