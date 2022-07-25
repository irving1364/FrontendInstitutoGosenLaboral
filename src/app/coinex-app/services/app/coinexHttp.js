(function() {

    'use strict';

    angular
        .module('coinex-app.services')
        .factory('$coinexHttp', function($http, Session) {
            return new CoinexHttp($http, Session);
        });

    function CoinexHttp($http, Session) {
        this.base = 'https://test.coinex.la/gateway/';
        this.http = $http;
        this.session = Session;
    }

    CoinexHttp.prototype = {
        setConfig: function(config) {
            var self = this;
            this.config = angular.extend(config, {
                headers: {
                    'Auth-Token': 'dsdsd'
                }
            });
        },
        setBase: function(base) {
            this.base = base;
        },
        post: function(endPoint, dataParams, configParams) {
            this.data = dataParams || {};
            this.setConfig(configParams || {});
            var head = {}; 
            head.Auth = 'dsdsd';
            return this.http.post(
                this.base.concat(endPoint), 
                this.data, 
                head
            );
        },
        get: function(endPoint, configParams) {
            this.setConfig(configParams || {});
            return this.http.get(
                this.base.concat(endPoint), 
                this.config
            );
        }
    }

})();