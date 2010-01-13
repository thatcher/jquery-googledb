/**
 * @author thatcher
 */
(function($, $M){

    var log,
        Contacts;

    $M.Test = function(options){
        $.extend(true, this, options);
        log = $.logger('GAE.Models.Test');
        Contacts = $.$('#contactsModel');
    };
    
    $.extend($M.Test.prototype, {
        core: function(){
            // RSpec/Bacon Style
            with (jqUnit) {
                
                //tests basic init functionality
                describe('jQuery GDB', 'Google Apps Engine DB API', {
                    
                    before: function(){
                        //no setup for this spec
                        db = new $.gdb({'default':{
                            //no db properties setable yet
                        }});
                    }
                    
                }).should('create a new domain by name', function(){
                    
                    db.create({
                        domain: 'contacts',
                        async: false,
                        success: function(result){
                            equals(result.db,     'http://appengine.google.com/1.0/','db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            ok(result.request,  'request id');
                            ok(result.cpu,      'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to create domain');
                        }
                    });
                    
                }).should('get a list of available sdb domains',function(){
            
                    db.get({
                        async: false,
                        success: function(result){
                            equals(result.db,   'http://appengine.google.com/1.0/', 'db implementation');
                            ok(result.request,  'request id');
                            ok(result.cpu,      'cpu usage');
                            for(var i=0;i<result.domains.length;i++){
                                if(result.domains[i] == 'contacts'){
                                    ok(true, 'found db expected domain.');
                                    return;
                                }
                            }
                            ok(false, 'failed to find expected domain');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to get db domains: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('save data by id to specific domain', function(){
                    
                    var person = {
                        firstname:  'john',
                        lastname:   'doe',
                        address:    '154 Maddex Farm Dr',
                        city:       'Shepherdstown',
                        state:      'WV',
                        zipcode:    '25443',
                        $class:    ['friend']
                    };
                    db.save({
                        domain: 'contacts',
                        id:'contact-000',
                        data:person,
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            equals(result.id, 'contact-000', 'db operation item id');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to get save data by id: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('batch save data by id to specific domain ', function(){
                    
                    var people = [{   
                        $id:'contact-001',
                        firstname:'jane',
                        lastname:'roe',
                        address:'1234 Maddex Farm Dr',
                        city: 'Shepherdstown',
                        state: 'WV',
                        zipcode: '25443',
                        $class:    ['friend']
                    },{
                        $id:'contact-002',
                        firstname:'john',
                        lastname:'deer',
                        address:'234 Potomac St',
                        city: 'Harpers Ferry',
                        state: 'WV',
                        zipcode: '25424',
                        $class:    ['school']
                    },{
                        $id:'contact-003',
                        firstname:'bob',
                        lastname:'dole',
                        address:'435 Deer Park Ln',
                        city: 'Sharpsburg',
                        state: 'MD',
                        zipcode: '25336',
                        $class:    ['work']
                    },{
                        $id:'contact-004',
                        firstname:'chaquita',
                        lastname:'estudiante',
                        address:'354 Thatcher Dr',
                        city: 'Shepherdstown',
                        state: 'WV',
                        zipcode: '25443',
                        $class:    ['school','friend']
                    }];
                    db.save({
                        domain: 'contacts',
                        data: people,
                        batch: true,
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts',  'db operation domain');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to get batch save: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('add attributes by name to specific id and domain', function(){
                    //note this is going to add another address, city, state, zipcode
                    db.add({
                        domain: 'contacts',
                        id:'contact-002',
                        data:{
                            'class':['friend']
                        },
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts',  'db operation domain');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('get all data from a specific id and domain', function(){
                    
                    db.get({
                        domain: 'contacts',
                        id:'contact-000',
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            equals(result.id, 'contact-000', 'db operation item id');
                            equals(result.data.length, 1, 'got 1 result');
                            equals(result.data[0].firstname, 'john', 'Attribute had the expected value');
                            equals(result.data[0].lastname, 'doe', 'Attribute had the expected value');
                            equals(result.data[0].address, '154 Maddex Farm Dr', 'Attribute had the expected value');
                            equals(result.data[0].city, 'Shepherdstown', 'Attribute had the expected value');
                            equals(result.data[0].state, 'WV', 'Attribute had the expected value');
                            equals(result.data[0].zipcode, '25443', 'Attribute had the expected value');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                            
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('get data fields by name from a specific id and domain', function(){
                    
                    db.get({
                        domain: 'contacts',
                        id:'contact-000',
                        data:['firstname'],
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts',  'db operation domain');
                            equals(result.id, 'contact-000', 'db operation item id');
                            equals(result.data.length, 1, 'got 1 result');
                            equals(result.data[0].firstname, 'john', 'got expected attribute and value');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('get a list of item ids from a specific domain', function(){
                    
                    db.get({
                        domain: 'contacts',
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/','db implementation');
                            equals(result.data.length, 5, 'got 5 ids');
                            equals(result.data[0], 'contact-000', 'got expected attribute and value');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('delete a field by name and value for a specific id and domain', function(){
                    
                    db.remove({
                        domain: 'contacts',
                        id:'contact-000',
                        data:{
                            firstname: 'john'
                        },
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/','db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            equals(result.id, 'contact-000', 'db operation item id');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to delete property from item: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('delete fields by name for a specific id and domain', function(){
                    
                    db.remove({
                        domain: 'contacts',
                        id:'contact-001',
                        data:['firstname', 'lastname'],
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/','db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            equals(result.id, 'contact-001', 'db operation item id');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to delete property from item: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('delete all data by id in a specific domain', function(){
                    
                    
                    db.remove({
                        domain: 'contacts',
                        id:'contact-003',
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            equals(result.id, 'contact-003', 'db operation item id');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to delete property from item: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('should get a list of items by id', function(){
                        
                    db.get({
                        async:false,
                        domain: 'contacts',
                        id: ['contact-000', 'contact-001'],
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            equals(result.data[0].$id, 'contact-000', 'db operation item id');
                            equals(result.data[1].$id, 'contact-001', 'db operation item id');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to get items by list of ids: status('+(e?e:status)+')');
                        }
                    });
                     
                }).pending('return an error', function(){
                    
                    
                    db.find({
                        select:"this is a totally invalid select statement",
                        async: false,
                        success: function(result){
                            ok(false, 'failed to trigger error callback');
                        },
                        error: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/','db implementation');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                            ok(result.error, 'error reported');
                            ok(result.error.code, 'http error code reported  ');
                            ok(result.error.type, 'error type reported  ');
                            ok(result.error.msg, 'error msg reported  ');
                        }
                    });
                    
                }).should('find data that match the selection', function(){
                    
                    db.find({
                        select:"new Query('contacts').addFilter('$class', $EQUAL, 'friend')",
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.data.length, 4, 'Got expected number of results');
                            equals(result.data[0].firstname, undefined, 'Attribute was deleted');
                            equals(result.data[0].lastname, 'doe', 'Attribute had the expected value');
                            equals(result.data[0].address, '154 Maddex Farm Dr', 'Attribute had the expected value');
                            equals(result.data[0].city, 'Shepherdstown', 'Attribute had the expected value');
                            equals(result.data[0].state, 'WV', 'Attribute had the expected value');
                            equals(result.data[0].zipcode, '25443', 'Attribute had the expected value');
                            equals(result.data[1].firstname, undefined, 'firstname attribute was deleted');
                            equals(result.data[1].lastname, undefined, 'lastname attribute was deleted');
                            equals(result.data[1].address, '1234 Maddex Farm Dr', 'Attribute had the expected value');
                            equals(result.data[1].city, 'Shepherdstown', 'Attribute had the expected value');
                            equals(result.data[1].state, 'WV', 'Attribute had the expected value');
                            equals(result.data[1].zipcode, '25443', 'Attribute had the expected value');
                            equals(result.data[2].firstname, 'john', 'Attribute had the expected value');
                            equals(result.data[2].lastname, 'deer', 'Attribute had the expected value');
                            equals(result.data[2].address, '234 Potomac St', 'Attribute had the expected value');
                            equals(result.data[2].city, 'Harpers Ferry', 'Attribute had the expected value');
                            equals(result.data[2].state, 'WV', 'Attribute had the expected value');
                            equals(result.data[2].zipcode, '25424', 'Attribute had the expected value');
                            equals(result.data[3].firstname, 'chaquita', 'Attribute had the expected value');
                            equals(result.data[3].lastname, 'estudiante', 'Attribute had the expected value');
                            equals(result.data[3].address, '354 Thatcher Dr', 'Attribute had the expected value');
                            equals(result.data[3].city, 'Shepherdstown', 'Attribute had the expected value');
                            equals(result.data[3].state, 'WV', 'Attribute had the expected value');
                            equals(result.data[3].zipcode, '25443', 'Attribute had the expected value');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to delete sdb domains: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('retrieve domain metadata for existing domain', function(){
                    
                    db.metadata({
                        domain: 'contacts',
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                            ok(result.count, 'domain item count');
                            ok(result.timestamp, 'domain creation timestamp');
                            ok(result.namesize, 'domain size of names in bytes');
                            ok(result.valuesize, 'domain size of values in bytes');
                            ok(result.size, 'domain total size');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to get sdb domain metadata: status('+(e?e:status)+')');
                        }
                    });
                    
                }).should('delete a domain by name', function(){
                    
                    db.destroy({
                        domain: 'contacts',
                        async: false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(xhr, status, e){
                            ok(false, 'failed to delete sdb domains: status('+(e?e:status)+')');
                        }
                    });
                    
                });
            }
        },
        server: function(){
            this.client();
        },
        client: function(){
            
            with (jqUnit) {
        
                //tests basic init functionality
                describe('Claypool Models', 'Google Apps Engine DB API', {
                    
                    before: function(){
                        //No setup
                    }
                    
                }).should('create the domain', function(){
                    
                    Contacts.create({
                        async:false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(error){
                            ok(false, 'failed to create domain ('+error+')');
                            var prop, p;
                            for(prop in error){
                                ok(false, 'error  '+error[prop]);
                                
                                for(p in error[prop]){
                                    ok(false, 'error detail '+error[prop][p]);
                                }
                            }
                        }
                    });
                   
                }).should('invalidate an invalid record', function(){
                    
                    var contact = {
                       $id:         'contact_'+$.guid(),
                       $class:      ['friend, family', 'work', 'school'],
                       firstname:   'chris',
                       lastname:    'thatcher',
                       email:       'thatcher.christopher'
                    };
                    Contacts.validate({
                        data: contact, 
                        success: function(){
                            ok(false, 'contact should not validate successfully');
                        },
                        error: function(model, flash){
                            equals(flash.length, 1, 'found all invalid fields ');
                            equals(flash[0].field, 'email', 'invalid email address');
                            equals(flash[0].msg, 'email address format', 'invalid email address ('+flash[0].value+')');
                        }
                   });
                   
                }).should('validate a valid record', function(){
                    
                    var contact = {
                       $id:         'contact_'+$.guid(),
                       $class:      ['friend', 'work'],
                       firstname:   'chris',
                       lastname:    'thatcher',
                       email:       'thatcher.christopher@example.com'
                    };
                    Contacts.validate({
                        data: contact, 
                        success: function(model){
                            ok(true, "Correctly validated model");
                        },
                        error: function(model, flash){
                            ok(false, "Should find no invalid fields : \n"+flash.join('\n'));
                        }
                   });
                   
                }).should('save a new record', function(){
                    
                    var contact = {
                       $id:         'contact_'+$.guid(),
                       $class:      ['friend', 'work'],
                       firstname:   'chris',
                       lastname:    'thatcher',
                       email:       'thatcher.christopher@example.com'
                    };
                    
                    Contacts.save({
                        async:false,
                        id: contact.$id, 
                        data: contact,  
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts',  'db operation domain');
                            equals(result.id, contact.$id, 'db operation item id');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error:function(error){
                            ok(false, 'failed to save data to contacts ');
                            var prop;
                            for(prop in error){
                                ok(false, 'error  '+error[prop]);
                            }
                        }
                    });
                   
                }).should('post a query to the rest service', function(){
                   
                    Contacts.find({
                        async:false,
                        select:"new Query('contacts').addFilter('lastname', $GREATER_THAN_OR_EQUAL, 't').addFilter('lastname', $LESS_THAN, 'u')",
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.data.length,          1,          'expected number of data points returned');
                            ok(result.data[0].$id,              'got expected $id value');
                            equals(result.data[0].firstname,    'chris',    'got expected firstname value');
                            equals(result.data[0].lastname,     'thatcher', 'got expected lastname value');
                            equals(result.data[0].email,        'thatcher.christopher@example.com', 'got expected email');
                            equals(result.data[0].$class.length, 2, 'got expected number of meta $classes');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(result){
                           ok(false, 'query failed');
                        }
                    }); 
                   
                }).should('bulk save some records', function(){
                    
                    var addressbook = [{
                        "$id":          'contact_'+$.guid(),
                        "firstname":    "Jason",
                        "lastname":     "Jones",
                        "city":         "San Francisco",
                        "state":        "CA",
                        "zipcode":      '94121',
                        "address":      "444 Columbus Ave",
                        "email":        ["jason@sf.com", "sjones@adobe.com"]
                    }, {
                        "$id":          'contact_'+$.guid(),
                        "firstname":    "Briana",
                        "lastname":     "Banks",
                        "city":         "Los Angeles",
                        "state":        "CA",
                        "zip":          '94001',
                        "address":      "333 West Muenster Ave, apt 123B",
                        "email":        ["bbanks@wm.com", "bb@blahdeeblah.com"]
                    }]; 
                    Contacts.validate({
                        batch:true,
                        data:addressbook,
                        success: function(data){
                            ok(true, 'data should validate');
                            Contacts.save({
                                async:false,
                                batch:true,
                                data: data,  
                                success: function(result){
                                    equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                                    equals(result.domain, 'contacts',  'db operation domain');
                                    ok(result.request, 'request id');
                                    ok(result.cpu, 'cpu usage');
                                },
                                error: function(result){
                                    ok(false, 'failed to batch save data')
                                }
                           });
                       },
                       error: function(data, flash){
                           ok(false, 'data should validate');
                       }
                   });
                    
                }).should('post a query', function(){
                    
                    Contacts.find({
                        async:false,
                        select:"new Query('contacts').addFilter('state', $EQUAL, 'CA')",
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.data.length, 2, 'got expected number of results');
                            equals(result.data[0].firstname, 'Jason', 'got expected value');
                            equals(result.data[0].lastname, 'Jones', 'got expected value');
                            equals(result.data[1].firstname, 'Briana', 'got expected value');
                            equals(result.data[1].lastname, 'Banks', 'got expected value');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(result){
                           ok(false, 'query failed to perform as expected');
                        }
                   }); 
                    
                }).should('delete the domain', function(){
                    
                     Contacts.destroy({
                        async:false,
                        success: function(result){
                            equals(result.db, 'http://appengine.google.com/1.0/', 'db implementation');
                            equals(result.domain, 'contacts', 'db operation domain');
                            ok(result.request, 'request id');
                            ok(result.cpu, 'cpu usage');
                        },
                        error: function(result){
                           ok(false, 'failed to destroy domain '+result);
                        }
                    });
                   
                });
            }
        }
    });

})(jQuery, GAE.Models);