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
            if(model.document){
                log.info("Rendering client dom as html "); 
                this.write(model.document);
            }else{
                log.info("Rendering server dom as html "); 
                this.write(document.xml);
            }
        }
    });
    
})(jQuery, GAE.Views);
