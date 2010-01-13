/**
 * @author thatcher
 */
(function($, $M){
    
    var log;
    
    $M.Contacts = function(options){
        $.extend(this, $.model('contacts', {
            $id:{
                pattern:/contact_\w+/,
                not:[null],
                msg:'required and of the form contact_*',
                generate: function(){return 'contact_'+$.guid();}
            },
            $class:{
                pattern:/\w+/,
                msg: 'a list of words'
            },
            firstname:{
                pattern:/.*/,
                msg: 'upto 64 characters'
            },
            lastname:{
                pattern:/.*/,
                msg: 'upto 64 characters'
            },
            address:{
                pattern : /.*/,
                msg:'upto 512 characters'
            },
            city:{
                pattern:/.*/,
                msg: 'upto 64 characters'
            },
            state:{
                pattern:/.*/,
                msg: 'upto 64 characters'
            },
            country:{
                pattern:/.*/,
                msg: 'upto 64 characters'
            },
            zipcode:{
                pattern:/\d+(-\d+)?/,
                msg: 'zipcode format'
            },
            email:{
                pattern:/.*@.*/,
                msg: 'email address format'
            },
            
            created: {
                pattern: /\d{13}/,
                not: [null],
                generate: function(){ return new Date().getTime();}
            },
            
            deleted: {
                pattern: /\d{13}/
            },
            
            modified : {
                pattern: /\d{13}/,
                not: [null],
                generate: function(){ return new Date().getTime();}
            }
        }));
        
        $.extend(true, this, options);
        log = $.logger('GDB.Models.Contacts');
    };
    
    $.extend($M.Contacts.prototype, {

    });
    
})(jQuery, GAE.Models);

