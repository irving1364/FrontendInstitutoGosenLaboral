(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, $location, Session,$mdToast,interceptor,interceptor403)
    {
        // Activate loading indicator

        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
        {

            
            var noCheckRoute = [
                    '/registro',
                    '/login',
                    '/olvidaste-contrasena',
                    '/en/passwordRecovery'
            ];
       
            if(noCheckRoute.indexOf($location.path())==-1){
                /*
                Prueba para setear las sesiones
                Session.setToken("");
                Session.setUserAuth("");
                var token = Session.getToken();
                var usuario = Session.getUserAuth();
                console.log(localStorage);
                
                console.log(Session.getToken());
                console.log(Session.getUserAuth());
                if((!Session.getToken() && !Session.getUserAuth()) || (Session.getToken() == null && Session.getUserAuth() == null)){
                    var toastInstance = $mdToast.simple()
                        .textContent('Acceso no permitido, por favor inicie sesión')
                        .position('bottom right')
                        .hideDelay(4000)

                    $mdToast.show(toastInstance);
                    $location.path('/login');
                }*/
            }

            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });


        //interceptor.response({data: {"success":true,"missing_authenticators":["emailAuth"],"infos":[],"warnings":[],"errors":[],"results":{"uploadedFiles":[],"nick":"irv13642","email":"irving1364@gmail.com","signup":false,"preferredLanguage":"en","twoFactor":[],"hasGoogleAuth":true,"kyc":true,"annex":{"canceledMail":"1","canceledURL":"http://123sdasdasdsad.com3","confirmedMail":"1","confirmedURL":"http://123sdasdasdsad.com2","feePercentage":"38","firstName":"213123","lastName":"12312312321","merchantId":"67b77745","paymentMail":"irving@gmail.com","receivedMail":"1","receivedURL":"http://123sdasdasdsad.com1","riskOption":"Risk"},"otc":false,"depositToken":"61613438363465396330376165646131744b6d7a4f4c7a4751556d6e436d6d7171456b4134773d3d","subscribedEmails":[{"ident":"buy_executed","subscribed":false},{"ident":"payment_sent","subscribed":false},{"ident":"ready_to_claim","subscribed":false},{"ident":"sell_executed","subscribed":false}]}}});
        
    }
})();