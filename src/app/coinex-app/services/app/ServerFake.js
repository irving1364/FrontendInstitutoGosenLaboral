(function() {

	var namespace = window.app = window.app || {}; 

	namespace.ServerFake = ServerFake;

	function ServerFake($q, status) {
		this.status = status || 'OK';
		this.q = $q;
	}

	ServerFake.prototype = {

		setBase: function(base) {
			//stub
		},

		setStatus: function(status) {
			this.status = status;
		},

		setResolve: function(resolve) {
			this.resolve = resolve;
		},

		setReject: function(reject) {
			this.reject = reject;
		},

		post: function(endPoint, data, config) {
			var defer = this.q.defer();

			if(this.status == 'OK') defer.resolve(this.resolve);
			else defer.reject(this.reject);

			return defer.promise;
		},

		get: function(endPoint, config) {
			var defer = this.q.defer();

			if(this.status == 'OK') defer.resolve(this.resolve);
			else defer.reject(this.reject);

			return defer.promise;
		},


	}



})();