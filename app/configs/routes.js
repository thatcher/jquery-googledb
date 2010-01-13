/**
 * @author thatcher
 */


//-------------------------------------------------------------------------------------//
//  -   ROUTERS     -
//  - Routers are low level controllers that hijax the browsers/servers normal behaviour 
//  - forwarding control to a high level controller that you've written.  In particular
//  - we use links, form sumbission, and events (Claypool.Server includes support
//  - for http request routing).
(function($){
   $.routes({
        "hijax:server" : [{
            id:"#gbd-server-routes",
            hijaxMap:
              [{ urls :"/rest/$",    	            controller:"#restService"},
               { urls :"/rest/|:domain|/$",    	    controller:"#restService"},
               { urls :"/rest/|:domain|/|:id|/?$",  controller:"#restService"},
               { urls :"/specs/?$",                 controller:"#testService", action:'index'},
               { urls :"/specs/core/?$",    	    controller:"#testService", action:'core'},
               { urls :"/specs/server/?$",          controller:"#testService", action:'server'},
               { urls :"/specs/client/?$",          controller:"#testService", action:'client'}]
        },{
            id: "#gdb-manage-routes",
            hijaxMap:
               [{ urls :"/manage/$",                                            controller:"#manageService"},
                { urls :"/manage/<:command(\\w+):>(/<:target(\\w+):>)?(/)?$",   controller:"#manageService"}]
        }]   
    });
})(jQuery);