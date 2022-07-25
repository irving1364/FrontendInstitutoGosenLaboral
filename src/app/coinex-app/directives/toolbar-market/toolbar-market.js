(function() {


	'use strict';

	angular
		.module('coinex-app.directives')
		.controller('ToolbarMarket', ToolbarMarket);


	function ToolbarMarket($scope, Session, $state, $rootScope, $mdSidenav, $mdToast, fuseTheming, $mdDialog, $document ) {

		angular.extend($scope, {
            toggleSidenav: toggleSidenav,
            createTheme: createTheme  
        });		

		
		function createTheme(ev)
        {
            $mdDialog.show({
                controller         : 'CustomThemeDialogControllerNew',
                controllerAs       : 'vm',
                templateUrl        : 'app/coinex-app/directives/toolbar-market/custom-theme/custom-theme-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true
            });
        }

		function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        $scope.anio = localStorage.getItem("anio");        
	}

})();