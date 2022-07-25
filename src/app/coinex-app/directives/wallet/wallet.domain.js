(function() {

	'use strict';

	var namespace = window.domain = window.domain || {};

	namespace.wallet = wallet;

	function wallet(wallet) {
		angular.extend(this, wallet);
	}

	wallet.prototype = {
		equals: function(wallet) {
			return wallet.currency == this.currency;
		},
		decrement: function(amount) {

			var postDecrement = this.balance - amount;
			var _this = this;

			if(postDecrement < 0) throw {
				decrement: function() {
					return "El saldo de su wallet "+_this.currency+" Es insuficiente";
				}
			}

		}
	};





})();