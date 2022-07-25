/*
(function (){

	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.factory('carteraDashboardMap', carteraDashboardMap);


		function carteraDashboardMap() {

			return function(balances,collapseAll){
				
				return balances.map(function(balances){
					console.log("en el factory");
					console.log(balances);
					return new Cartera(	balance,
										modalRetiroCriptoCurrency,
										modalRetiroFiat,
										modalDepositoCriptoCurrency,
										modalDepositoFiatCurrency,
										collapseAll);
				});			


			}
		
		}

})();
*/