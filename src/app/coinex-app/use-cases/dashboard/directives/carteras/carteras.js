(function() {
	'use strict';

	angular
		.module('coinex-app.use-cases.dashboard')
		.directive('carteras', carteras)		
		
		.factory('carteraDashboardMap', function(modalRetiroCriptoCurrency, 
								 modalRetiroFiat,modalDepositoCriptoCurrency,
								 modalDepositoFiatCurrency) {

			return function(balances, collapseAll) {


				return balances.map(function(balance) {

					return new Cartera(
						balance,
						modalRetiroCriptoCurrency,
						modalRetiroFiat,
						modalDepositoCriptoCurrency,
						modalDepositoFiatCurrency,
						collapseAll
					);


				});

			}

		});		
		
	function carteras() {
		return {
			scope: {
				cartera:'='
			},
			controller: function($scope) {

			},	
	        templateUrl: 'app/coinex-app/use-cases/dashboard/directives/carteras/carteras.html',
        } 

	}

	function Cartera(balance,modalRetiroCriptoCurrency, 
					 modalRetiroFiat,modalDepositoCriptoCurrency, 
					 modalDepositoFiatCurrency, collapseAll) {

		angular.extend(this, balance);
		this.modalRetiroCriptoCurrency = modalRetiroCriptoCurrency;
		this.modalRetiroFiat = modalRetiroFiat;
		this.modalDepositoCriptoCurrency = modalDepositoCriptoCurrency;
		this.modalDepositoFiatCurrency = modalDepositoFiatCurrency;
		this.collapseAll = collapseAll;
		this.collapseOut();
	}

	
	Cartera.prototype = {
		
		collapseIn: function() {
			this.collapseAll();
			this.collapse = true;
			this.toggleIcon = 'icon-chevron-down';
		},
		collapseOut: function() {
			this.collapse = false;
			this.toggleIcon = 'icon-chevron-right'
		},
		onToggle: function() {

			if(this.collapse)
				this.collapseOut();
			else
				this.collapseIn();
		},

		openModalRetiro: function(ev) {
			if(this.fiat) this.openModalRetiroFiat(ev);
			else this.openModalRetiroCriptCurrency(ev);
		},

		openModalRetiroCriptCurrency: function(ev) {
			var self = this;

			this.modalRetiroCriptoCurrency({
				ev: ev,
				locals: {balance: self},
				close: function() {
				},
				hide: function() {
				}
			});
		},

		openModalRetiroFiat: function(ev) {
			var self = this;

			this.modalRetiroFiat({
				ev: ev,
				locals: {balance: self},
				close: function() {
				},
				hide: function() {
				}
			});
		},

		openModalDeposito: function(ev) {

			if(this.fiat) this.openModalDepositoFiatCurrency(ev);
			else this.openModalDepositoCrytoCurrency(ev);
		},

		openModalDepositoCrytoCurrency: function(ev) {
			var self = this;

			this.modalDepositoCriptoCurrency({
				ev: ev,
				locals: {balance: self},
				close: function() {
				},
				hide: function() {
				}
			});
		},

		openModalDepositoFiatCurrency: function(ev) {
			var self = this;

			this.modalDepositoFiatCurrency({
				ev: ev,
				locals: {balance: self},
				close: function() {
				},
				hide: function() {
				}
			});

		},

	}

})();