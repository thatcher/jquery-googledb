/**
 * @author thatcher
 */
(function($,  $S){
    
    var log,
        Test;
    
    $S.Test = function(options){
        log = $.logger('GAE.Services.Test');
        $.extend(true, this, options);
        Test = $.$('#testModel');
    };
    
    $.extend($S.Test.prototype,{
        /**
         *  Tests the underlying javascript cloud db api.  
         */
        index: function(event){
            log.debug('Serving tests page.');
            var body = $('body').html(),
                _this = this;
            
            $('body').append(
                '<ul>'+
                    $.map(['core', 'server', 'client'], function(value,index){
                        return '<li><a href="./'+value+'/">'+value+'</a></li>'
                    }).join('\n')+
                '</ul>'
            );
            
            event.render(function(){
                //reset body
                $('body').html(body);
            });
        },
        core: function(event){
            log.debug('Serving tests page.');
            var body = $('body').html();
            
            Test.core();
            
            event.render(function(){
                //reset body
                $('body').html(body);
            });
        },
        
        server: function(event){
            
            log.debug('Serving tests page.');
            var body = $('body').html();
            
            Test.server();
            
            event.render(function(){
                //reset body
                $('body').html(body);
            });
        },
        
        client: function(event){

            log.debug('Serving tests page.');
            var html = $('html').clone();
            
            $('script', html).each(function(index, script){
                var src = $(script).attr('src');
                log.debug('modifying script tag %s', src);
                $(script).attr('type', 'text/javascript');
                if(src == 'app/boot/server.js'){
                    //The test boot file is responsible for
                    //running the tests client-side;
                    $(script).attr('src', '/app/boot/test.js');
                }else{
                    $(script).attr('src', '/'+src);
                }
            });
            
            event.
                m({
                    document:'<html>'+$(html).html()+'</html>'
                }).
                render();

        }
        
    });
    
})(jQuery, GAE.Services );
