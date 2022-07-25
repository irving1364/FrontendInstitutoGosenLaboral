(function (){

	'use strict'

	angular
		.module('coinex-app.draglet')
		.factory('newAddressResponseFake',newAddressResponseFake);

		function newAddressResponseFake(){
			return{
			ok: {	
				data : {"success":true,"missing_authenticators":[],"infos":[],"warnings":[],"errors":[],"results":{"newAddress":"moWbmPJF4odzwifM8aA68UYL2ACRY4R1vz"}}	
			},
			error: {	
				data : {"success":false,"missing_authenticators":[],"infos":[],"warnings":[],"errors":[],"results":{"newAddress":"moWbmPJF4odzwifM8aA68UYL2ACRY4R1vz"}}	
			},
		}
	}

})();