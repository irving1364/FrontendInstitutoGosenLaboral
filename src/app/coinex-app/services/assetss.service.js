(function() {
	
	'use strict';

	angular
		.module('coinex-app.draglet')
		.service('googleService', googleService);

	function googleService($http, $q) {

		

		this.googleFast = function(url)
		{
			console.log(url);
			var deferred = $q.defer();

			return $http.get("https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=https://developers.google.com/speed/pagespeed/insights/&strategy=mobile&key=AIzaSyApFtdAvFoeShozpQJOAmnkr83azjiSerA", {
				headers: {
					"Content-type": undefined
				},
				transformRequest: angular.identity
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}

	}

})();