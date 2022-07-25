(function() {
	
	'use strict';

	angular
		.module('coinex-app.directives')
		.factory('walletsExtend', walletsExtend);

	function walletsExtend() {

		return [{
			"currency": "BTC",
			"nick": "Bitcoin",
			"icon": "assets/images/wallets-icons/Iconos_Bitcoin.png"
		}, {
			"currency": "DOG",
			"nick": "Dogcoin",
			"icon": "assets/images/wallets-icons/Iconos_Dogecoin.png"
		}, {
			"currency": "LTC",
			"nick": "Litecoin",
			"icon": "assets/images/wallets-icons/Iconos_Litecoin.png"
		}, {
			"currency": "USD",
			"nick": "USD Dolar",
			"icon": "assets/images/wallets-icons/Iconos_Dolar.png"
		}, {
			"currency": "ETH",
			"nick": "Ethereum",
			"icon": "assets/images/wallets-icons/Iconos_Ethereum.png"
		}, {
			"currency": "VEF",
			"nick": "VEF Bolivar",
			"icon": "assets/images/wallets-icons/Iconos_VEF.png"
		}, {
			"currency": "ARS",
			"nick": "Peso Argentino",
			"icon": "assets/images/wallets-icons/Iconos_ARS.png"
		}];
		
	}


})();