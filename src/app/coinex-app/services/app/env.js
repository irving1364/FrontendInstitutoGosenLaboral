(function() {

	var namespace = window.app = window.app || {}; 

	namespace.env = env;

	function env(envName, cb) {

		var envNames, setEnv;

		envNames = {
			TEST: 'TEST',
			PROD: 'PROD'
		};

		setEnv = envNames.PROD;

		if(setEnv == envName) cb();
	}

	



})();