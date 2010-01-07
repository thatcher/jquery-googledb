/**
 * @author thatcher
 */
/**
 * @author thatcher
 */
(function($, $V){
    
    var log;
    
    $V.Test = function(options){
        $.extend(true, this, options);
        log = $.logger('GAE.Views.Test');
    };
    
    $.extend($V.Test.prototype, {
        render: function(model){
            log.info("Rendering results as html "); 
            this.write(document.xml);
        }
    });
    
})(jQuery, GAE.Views);
