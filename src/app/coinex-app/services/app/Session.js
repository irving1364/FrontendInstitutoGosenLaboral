(function() {

	'use strict';

	angular
		.module('coinex-app.services')
		.factory('Session', function($q) {
			return new Session($q);
		});

	function Session($q) {
		this.q = $q;
		this.setConfig({});
	}

	Session.prototype = {
		setConfig: function(configExtend) {
			this.config = {
				AUTH_TOKEN: 'AUTH_TOKEN',
				AUTH_USER : 'AUTH_USER'
			};
			angular.extend(this.config, configExtend);
		},
		setToken: function(token) {
			localStorage.setItem(this.config.AUTH_TOKEN, token);
		},
		getToken: function() {
			return localStorage.getItem(this.config.AUTH_TOKEN);
		},
		setUserAuth: function (user) {
			localStorage.setItem(this.config.AUTH_USER, JSON.stringify(user));
		},
		getUserAuth: function() {
			return JSON.parse(localStorage.getItem(this.config.AUTH_USER));
		},
		expireSession: function() {
			var url = localStorage.getItem("apiUrl");
			var urlEvaluaciones = localStorage.getItem("urlEvaluaciones");
			
			localStorage.clear();
			localStorage.setItem('apiUrl', url);
			localStorage.setItem('urlEvaluaciones', urlEvaluaciones);
			return this.q.resolve({});
		}
	}

})();

