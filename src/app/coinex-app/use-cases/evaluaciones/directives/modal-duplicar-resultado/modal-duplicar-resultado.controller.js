(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.controller('modalDuplicarResultadoController', modalDuplicarResultadoController);
	
	function modalDuplicarResultadoController($scope, $mdDialog, $mdToast, locals 
											 ) {

		function close(duplicadas) {
			$mdDialog.hide(duplicadas);
		}

		function cancel() {
			$mdDialog.cancel('cancel');
		}

		function init (){
			angular.extend($scope, {
				close: close,
				cancel: cancel
			});
		
			console.log(locals.duplicadas);
			$scope.duplicadas = {};
			$scope.duplicadas = locals.duplicadas;
			$scope.duplicadas.count = $scope.duplicadas.length;
		}
	
		function mensajeToast(mensaje){
			var toastInstance = $mdToast.simple()
					.textContent(mensaje)
					.position('top-right')
					.hideDelay(6000);

			$mdToast.show(toastInstance);
		}			

		
	function toggleLimitOptions() {
		$scope.limitOptions = $scope.limitOptions ? undefined : [15, 30, 50];
	};
	  
	
	function loadStuff() {
	  $scope.promise = $timeout(function () {
		// loading
	  }, 2000);
	}
	
	$scope.selected = [];
	  $scope.limitOptions = [50];
	  $scope.options = {
		rowSelection: true,
		multiSelect: true,
		autoSelect: true,
		decapitate: false,
		largeEditDialog: true,
		boundaryLinks: true,
		limitSelect: true,
		pageSelect: true
	  };       
	  $scope.query = {
		order: 'name',
		limit: 5,
		page: 1
	  };

		init();
	}

})();