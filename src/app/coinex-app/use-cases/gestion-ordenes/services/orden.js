(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.factory('orden', function() { return orden; });

	function orden(wallets, morph, $rootScope) {
		this.dispatcher = $rootScope;
		
		this.setConstants();
		this.setMorph(morph);

		this.currenciesLimitDisabled = true;
		this.walletsLimit = [];
		this.criptoWallets = [];
		this.cantidadNominal = '';
		this.cantidadLimite = '';
		this.currencyLimite = '';
		this.saldoRequerido = '';
		
		this._defaultStateAndTipoOrden();
		this._setAllWallets(wallets);
		this._setCriptoWallets();
		this._setWalletSelected(this._findWalletByCurrency('BTC'));
		this._setWalletsLimit();

	}

	orden.prototype = {
		_setWalletSelected: function(walletSelected) {
			this.walletSelected = walletSelected;
		},
		_setWalletsLimit: function() {
			this.walletsLimit = this._getCurrenciesLimit();
		},
		_setAllWallets: function(wallets) {
			this.allWallets = wallets;
		},
		setConstants: function() {
			this.morphs = {
				COMPRA: 'COMPRA',
				VENTA: 'VENTA'
			};
			this.TIPO_ORDEN = {
				MERCADO: 'mercado',
				CUSTOM: 'custom'
			};
			this.STATUS_ORDEN = {
				PAUSAR: 'pausar',
				CANCELAR: 'cancelar'
			};
		},
		setText: function(text) {
			this.text = text;
		},
		setMorph: function(morph) {
			this.morph = morph;
		},
		setBestOferrService: function(bestOferrService) {
			this.bestOferrService = bestOferrService;
		},
		setCantidadLimite: function(cantidadLimite) {
			this.cantidadLimite = cantidadLimite;
		},
		_setCriptoWallets: function() {
			this.criptoWallets = _.where(this._getAllWallets(), { fiat : false});
		},
		_setCurrenciesLimitDisabled: function(disabled) {
			this.currenciesLimitDisabled = disabled;
		},
		_defaultStateAndTipoOrden: function() {
			this.tipoOrden= this.TIPO_ORDEN.CUSTOM;
			this.status= this.STATUS_ORDEN.PAUSAR;
		},
		toBuy: function() {
			return this.getCommand();
		},
		toSell: function() {
			return this.getCommand();
		},
		getCommand: function(settings) {
			var self, command, isPaused, isCustom;
			self = this;
			isPaused = (self.status === self.STATUS_ORDEN.PAUSAR);
			isCustom = (self.tipoOrden === self.TIPO_ORDEN.CUSTOM);
			command = {
				market: self.market(),
				nominal: self.cantidadNominal,
				pauseNoCredit: isPaused
			};
			if(isCustom) {
				command.limit = self.cantidadLimite;
			}
			return angular.extend(command, settings || {});
		},
		cleanCantidadLimiteAndSaldoRequerido: function() {
			this.cantidadLimite = '';
			this.saldoRequerido = '';
		},
		cleanAll: function() {
			this.cantidadNominal = '';
			this.currencyLimite = '';
			this.cantidadLimite = '';
			this.saldoRequerido = '';
		},
		isWalletSelected: function(wallet) {
			return wallet.currency == this.walletSelected.currency;
		},
		walletSelectedCurrency: function() {
			return this.walletSelected.currency;
		},
		cantidadLimiteLineHide: function() {
			return (this.currencyLimite == '') ||  (this.cantidadNominal == '');
		},
		cantidaLimiteHide: function() {
			return this.tipoOrden != this.TIPO_ORDEN.CUSTOM;
		},

		_getAllWallets: function() {
			return this.allWallets;
		},
		getCriptoWallets: function() {
			return this.criptoWallets;
		},
		getWalletSelected: function() {
			return this.walletSelected;
		},
		_getCurrenciesLimit: function() {

			var self = this;

			var markets = {
				BTC: function() {
					return self._filterWallet(['USD','VEF','ARS','LTC','DOG','ETH']);
				},
				LTC: function() {
					return self._filterWallet(['BTC','DOG','ETH']);
				},
				DOG: function() {
					return self._filterWallet(['BTC','LTC','ETH']);
				},
				ETH: function() {
					return self._filterWallet(['BTC','LTC','DOG']);
				}
			}

			return markets[self.walletSelected.currency]();
		},
		_findWalletByCurrency: function(currency) {
			return _.find(this._getAllWallets(), {currency: currency});
		},
		_filterWallet: function(rules) {
			return _.filter(this._getAllWallets(), function(wallet) {
				return rules.indexOf(wallet.currency) != (-1);
			});
		},
		updateSaldoRequerido: function() {

			var saldoRequerido = this.cantidadNominal * this.cantidadLimite;
			var saldoRequeridoMasComision = saldoRequerido + (saldoRequerido * 0.01);

			this.saldoRequerido = saldoRequeridoMasComision.toFixed(2);
		},
		market: function() {
			return [
				this.walletSelected.currency,
				this.currencyLimite
			].join('-');
		},
		onSelectWallet: function(wallet) {
			this.fireCleanMarket();
			this._setWalletSelected(wallet);
			this._setWalletsLimit();
			this._defaultStateAndTipoOrden();
			this.cleanAll();
		},
		fireCleanMarket: function() {
			this.dispatcher.$emit('market:reset', {});
		},
		onChangeCantidadNominal: function() {
			if(this.cantidadNominal == '') {
				this._setCurrenciesLimitDisabled(true);
			}
			else {
				this._setCurrenciesLimitDisabled(false);
				this.updateSaldoRequerido();
			}
		},
		onChangeCurrencyLimit: function() {
			this.fireChangeMarket();
			this.cleanCantidadLimiteAndSaldoRequerido();
			this._defaultStateAndTipoOrden();
			this.getBestOfert();
		},	
		fireChangeMarket: function() {
			var self = this;
			self.dispatcher.$emit('market:change', {
				market: {
					nominal: self.getWalletSelected().currency,
					limit: self.currencyLimite
				}
			});
		},
		onChangeCantidadLimite: function() {
			this.updateSaldoRequerido();
		},
		onChangeTipoOrden: function() {
			var self = this;
			var strategies = {
				mercado: function() {
					self.cleanCantidadLimiteAndSaldoRequerido();
					self.getBestOfert();
				},
				custom: function() {
					self.cleanCantidadLimiteAndSaldoRequerido();
					self.getBestOfert();
				}
			};
			strategies[self.tipoOrden]();
		},
		getBestOfert: function() {
			this.bestOferrService.handle(
				{market: this.market()}, 
				this.bestOferrServiceSuccess.bind(this), 
				this.bestOferrServiceFailed.bind(this)
			);
		},
		bestOferrServiceSuccess: function(response) {

			if(this.morph == this.morphs.VENTA){
				this.cantidadLimite = response.ask().lastQuote;
				this.updateSaldoRequerido();
			}

			if(this.morph == this.morphs.COMPRA){
				this.cantidadLimite = response.bid().lastQuote;
				this.updateSaldoRequerido();
			}
		},
		bestOferrServiceFailed: function(error) {
			console.log(error);
		}
	}

})();