(function() {


    'use strict';

    angular
        .module('coinex-app.draglet')
        .factory('interceptor', interceptor);

    function interceptor($injector) {

           return {
                response: function(response){
                    var authLoginEmailModal = $injector.get('authLoginEmailModal');
                        if (response.data.missing_authenticators) {
                            response.data.missing_authenticators.map(function(missing) {
                                console.log('1');
                                console.log(missing);
                                if(missing=='emailAuth') {
                                     setTimeout(resolveData(response, authLoginEmailModal), 10);
                                }
                            });       
                        }
                        
                  return response;
                }
           }
    }    

    function resolveData(response, authLoginEmailModal) {
        return function() {
            authLoginEmailModal({
                ev: {},
                locals: {
                   data: response
                },
                close: function() {},
                hide: function() {}
            });

        }
    }  

})();

