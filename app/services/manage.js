/**
 * @author thatcher
 */
/**
 * @author thatcher
 */
(function($, $S){
    
    var log,
        models = [
            'contacts',
        ];
    
    $S.Manage = function(options){
        $.extend(true, this, options);
        log = $.logger('GAE.Services.Manage');
    };
    
    $.extend($S.Manage.prototype, {
        handle:function(event){
            var command = event.params('command'),
                target = event.params('target'),
                body;
            if(command){
                Commands[command](target?[target]:models);
                event.response.headers = {
                    status:   302,
                    'Content-Type':'text/html',
                    'Location': '../../rest/'
                };
            }else{
                log.debug('Serving tests page.');
                body = $('body').html()
                event.
                    m({commands:['reset', 'syncdb', 'dumpdata']}).
                    render(function(){
                        //reset body
                        $('body').html(body);
                    });
            }
        }
    });
    
    var Commands = {
        reset: function(targets){
            //drops domains (tables) for each model
            $(targets).each(function(index, value){
                $.$('#'+value+'Model').destroy({
                    async:false,
                    success:function(result){
                        log.info(value+' domain destroyed');
                    }
                });
            });
        },
        syncdb: function(targets){
            //creates domain (tables) for each model
            $(targets).each(function(index, value){
                var domain = $.$('#'+value+'Model'),
                    data;
                    
                log.info('creating domain %s', value);
                domain.create({
                    async:false,
                    success:function(result){
                        log.info(value+' domain available');
                    }
                });
                
                //load the json dump data file
                log.info('loading domain data ');
                $.ajax({
                    type:'GET',
                    async:false,
                    url:$.env('data')+value+'.json',
                    dataType:'json',
                    success:function(_data){
                        data = _data;
                    },
                    error:function(xhr, status, e){
                        log.error('failed [%s] to load %s metadata %s', status, value, e);
                    }
                });
                log.info('loaded %s metadata %s', value, data);
                
                log.info('batch saving data for domain %s', domain);
                domain.save({
                    async:false,
                    batch:true,
                    data:data,
                    success: function(){
                        log.info('%s batch save successful', value);
                    },
                    error: function(){
                        log.error('%s batch save failed');
                    }
                });
            });
            
            
        },
        dumpdata: function(event){
    
        }
    }
})(jQuery, GAE.Services);


