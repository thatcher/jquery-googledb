/**
 *
 * @author thatcher
 *
 */
(function($, _){

    var log;
    
    $.filters([{
        id        : "#contentNegotiationFilter",
        target    : "GAE.Views.*",
        around    : "(render)",
        advice    : function(invocation){
            log = log||$.logger('GAE.Filters');
            log.debug('Intercepted call to render');
            var model = invocation.arguments[0],
                view = invocation.object;
            if(model.fo == 'json'){
                model.headers['Content-Type']='text/javascript';
                return view.write(_.json(model, null, '\t'));
                //do not proceed
            }else if(model.fo == 'xml'){
                model.headers['Content-Type']='application/xml';
                return view.write(_.x({x:model}));
                //do not proceed
            }else{
                if('template' in model)
                    model.template += '?'+new Date().getTime();
                return invocation.proceed();
            }
        }
    }]);

})(jQuery, jsPath);

