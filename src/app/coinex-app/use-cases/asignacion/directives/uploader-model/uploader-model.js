(function() {


	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.directive('uploaderModel', uploaderModel);

	function uploaderModel($parse) {
		console.log('llega1');
		return{
			restrict: 'A',
			link: function(scope, iElement, iAttrs)
			{
				iElement.on("change", function(e)
				{
					console.log(iElement);
					$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
				})
			}
		}

	}

})();