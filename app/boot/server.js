
//  -   BOOT THE APP  -
jQuery.noConflict();
(function($){
    
    //A static logger for any initialization routines we might add here
    var log = $.logger("GAE");
    
    //The environments are described in environments.js
    try{
 	   $.env('defaults', "dev.server");
 	   
 	   //normally we'd use $.env to set some configuration
       
 	}catch(e){
 	   log.error("Environmental selection is invalid!").exception(e);
 	}
    
    $(document).ready(function(){
        log.info("Initializing Application");
        $.boot(function(){
          //you can do additional initialization here
            log.info("Successfully Initialized Application");
        });
    });    
    
})(jQuery);  
