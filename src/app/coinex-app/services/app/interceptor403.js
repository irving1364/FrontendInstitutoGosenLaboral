(function() {


    'use strict';

    angular
        .module('coinex-app.draglet')
        .factory('interceptor403', interceptor403);

    function interceptor403($injector) {

           return {
                response: function(response){
                    var authPrivateModal = $injector.get('authPrivateModal');
                    console.log(response.status);
                        if (response.status == 200) {
                                     setTimeout(resolveData(response, authPrivateModal), 10);   
                                
                        }
                        //if (response.data == 200) {
                        //    console.log("fino");
                        //}
                  return response;
                  //console.log(response);
                }
           }
    }    

    function resolveData(response, authPrivateModal) {
        return function() {
            authPrivateModal({
                ev: {},
                locals: {
                   
                },
                close: function() {},
                hide: function() {}
            });

        }
    }  

})();

