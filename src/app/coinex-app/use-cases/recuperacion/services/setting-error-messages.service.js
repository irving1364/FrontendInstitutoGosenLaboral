(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.login')
		.factory('settingErrorMessagesLogin', settingErrorMessagesLogin);

	function settingErrorMessagesLogin($mdToast) {

		return function(errors) {

			var mensajes = errors.map(function(error) {
				if(error['WRONG_USER_PASSWORD']) {
					return mensaje('WRONG_USER_PASSWORD', 'La contraseña es incorrecta');
				}
				if(error['EMAIL_ALREADY_REGISTERED']) {
					return mensaje('EMAIL_ALREADY_REGISTERED', 'Email ya esta registrado');
				}
				if(error['EMAIL_INVALID']) {
					return mensaje('EMAIL_INVALID', 'Email invalido');
				}	
				if(error['CONFIRMATION_MAIL_SENT ']) {
					return mensaje('CONFIRMATION_MAIL_SENT ', 'Se ha enviado un correo para su confirmacion');
				}
				if(error['EMAIL_NOT_CONFIRMED']) {
					return mensaje('CONFIRMATION_MAIL_SENT ', 'Email no ha sido confirmado');
				}
				if(error['LOGIN_LOCKED']) {
					return mensaje('LOGIN_LOCKED ', 'Usuario bloqueado por ' +error['LOGIN_LOCKED'][0] + ' segundos');
				}
							
			});

			mensajes.forEach(function(mensaje) {
				mostrarMensaje(mensaje);
			});

		}

		function mensaje(key, value) {
			return {
				key: key,
				value: value
			}
		}

		function mostrarMensaje(mensaje) {

			if(!mensaje) return;


			var toastInstance = $mdToast.simple()
                       .textContent(mensaje.value)
                       .position('top-right')
                       .hideDelay(6000);

            $mdToast.show(toastInstance);
		}
	}

})();
