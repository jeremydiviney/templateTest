

require.config({

    //baseUrl: isProduction ? '/B4t2/modules/optimized/' : 'http://' + window.location.host + ':3000/modules',
    //urlArgs: isProduction ? 'v=' + requireArgsVersion : 'v=' + new Date().getTime(),

    paths:  {

    },

    shim: {

    }

});




require([],function(){


    require(['views/firmsView'],function(fView){

        var view = new fView();


    });





});



