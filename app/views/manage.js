/**
 * @author thatcher
 */
/**
 * @author thatcher
 */
(function($, $V){
    
    var log;
    
    $V.Manage = function(options){
        $.extend(true, this, options);
        log = $.logger('GAE.Views.Manage');
    };
    
    $.extend($V.Manage.prototype, {
        render: function(model){
            if(model.document){
                log.info("Rendering client dom as html "); 
                this.write(model.document);
            }else{
                log.info("Rendering server dom as html "); 
                
                $('body').append(
                    '<ul>'+
                        $.map(model.commands, function(value,index){
                            return '<li><a href="./'+value+'/">'+value+'</a></li>'
                        }).join('\n')+
                    '</ul>'
                );
                
                this.write(document.xml);
            }
        }
    });
    
})(jQuery, GAE.Views);
