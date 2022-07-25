(function() {

	'use strict';

	angular
		.module('coinex-app.services')
		.factory('channel', function($rootScope) {
			return Channel;
		});

	function Channel($rootScope) {
		this.rootScope = $rootScope;
		this.subscribers = [];
	}

	Channel.prototype = {

		publish: function(eventName, eventBody) {

			var self = this;

			if( !self.subscribers[eventName] ){
				self.subscribers[eventName] = [];
			}

			self.subscribers[eventName].forEach(function(subscriber) {
				subscriber(eventBody);
			});

			setTimeout(function() {

				self.rootScope.$digest();

			}, 0);

		},

		subscribe: function(eventName, subscribeCB) {

			if( !this.subscribers[eventName] ){
				this.subscribers[eventName] = [];
			}

			this.subscribers[eventName].push(subscribeCB);

			return this.position();

		},

		position: function() {
			return this.subscribers.length - 1;
		}

	}

})();