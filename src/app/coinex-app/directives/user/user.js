(function(){
	'use strict';
	angular
	.module('coinex-app.directives')
	.directive('user', user);

	function user(){

		return {

			scope:{

			},
			controller: function($scope, Session, $state){

				angular.extend($scope,{
					expireSession:expireSession
				});

				$scope.user = localStorage.getItem("nombre"); 
				$scope.cod_rol = localStorage.getItem("cod_rol"); 
				console.log($scope.user);

				function expireSession() {
				 	Session.expireSession().then(function(){
				 		$state.go('app.login');
				 	})

				}
			
			},

		templateUrl:'app/coinex-app/directives/user/user.html'	
		}

	
	}


})();