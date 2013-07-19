define([],function () {

    return Backbone.View.extend({

        initialize:function(){

            var that = this;
            //this.setElement($("<div/>"));

            if(this.options.template){
                this.compiledTemplate =  _.template(this.options.template);
            }

            this._renderComplete = true;

        },

        render: function(){

        },

        renderHTML: function(){
            console.log("HTML Render: " + this.id);
            this.templateData = {data:(this.templateData || null )};
            //console.log("---->" );
            //console.log(this.templateData);
            this.templateData = _.extend(this.templateData,{LV:this.loadSubView,that:this});

            if(this.compiledTemplate){
                this._serverHTML = this.compiledTemplate(this.templateData);
            }

        },

        dataReady: function(){

            //console.log("dataReady"  + this.id);
            //console.log(JSON.stringify(this.collection.models))
            this.renderHTML();
            this._renderComplete = true;
            this.renderTreeCheck();

        },

        renderTreeCheck: function(){

            var renderComplete = false;
            //console.log("renderTreeCheck" + this.id);
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

                //console.log("renderComplete" + this.id);
                this.attachViews();
                this.trigger("renderComplete");

            }

        },

        attachViews: function(){

            this._serverHTML =  this._serverHTML.replace(/<VIEWINSERT (.*)?>/gi,this.getChildViewHTML.bind(this));

        },

        getChildViewHTML: function(ignore,viewId){

             console.log('---->' + ignore,viewId);
            //if(!this.childViews[viewId])console.log("not here!!!!");
            //else
            return this.childViews[viewId]._serverHTML;
            //return "SKIP";

        },

        addSubView: function(viewConstructor,viewId,options){

            var tmpView;
            var that = this;
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

//                this.listenTo(this.childViews[options.id],"elementChange",function(stuff){
//                    //console.log("replacing... " + stuff.oldEl.html());
//                    stuff.oldEl.replaceWith(this.childViews[options.id].$el);
//                });

            }

            return this.childViews[options.id];

        },

        removeSubView: function(viewId){

            if(this.childViews[viewId]){
                this.childViews[viewId].remove();
                this.childViews[viewId] = null;
            }

        },

        removeSubViews: function(){

            for(var tmp in this.childViews){
                removeSubView(tmp.id);
            }

        },

        loadSubView: function(requireView,viewId,options,that){

            //console.log(that.id + " : " + this.id);
            //alert("lksdjf");
            var viewProto = require(requireView);
            var view = that.addSubView(viewProto,viewId,options);
            //view.renderHTML();
            return '<VIEWINSERT ' + view.id + '>';

        },

        serverRender: function(cB){

            var that = this;

            this.listenTo(this,"renderComplete",function(){
                cB(this._serverHTML);
            });

            if(this._renderComplete){
                this.stopListening(this,"renderComplete");
                cB(this._serverHTML);
            }

        }

    });


});
