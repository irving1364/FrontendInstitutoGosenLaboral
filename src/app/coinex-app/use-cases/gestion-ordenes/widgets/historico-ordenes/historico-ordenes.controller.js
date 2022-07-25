(function() {

	'use strict';

	angular
		.module('coinex-app.use-cases.gestion-ordenes')
		.controller('historicoOrdenes', historicoOrdenes);

	function historicoOrdenes($scope, $mdBottomSheet,
		$mdToast, ordenFilter, ordersService, historicoMap) {
		
		function init() {

			angular.extend($scope, {
				orders: [],
				makeOrderFilterBottomSheet: makeOrderFilterBottomSheet,
        filtrar:filtrar
			});
      setTimeout(function() {
           updateOrders(paramsDefault());
      }, 2500);
			
    }

		function makeOrderFilterBottomSheet(ev) {
			ordenFilter($mdBottomSheet, {
          templateUrl: [
          	'app/coinex-app/use-cases/gestion-ordenes/',
          	'directives/filtro-tabla/bottom-sheet-ventana.html'
          ].join(''),
          controller: ['$scope', '$mdBottomSheet', function($scope, $mdBottomSheet) {

            angular.extend($scope, {
              filtrar: filtrar,
              close: close
            });

            function close() {
              $mdBottomSheet.hide({});
            }

          }],
          ev: ev,
          close: function(context) {}
      });
		}

		function filtrar(command) {

			var bandera, state = [], fromOrdernumber, toOrdernumber;
      var pagesize = 5;
				           		
     		if (command.compra == command.venta) {
     			bandera = true;
     			command.type = null;
     		}

     		if (!bandera && command.compra != 0) {
     			command.type = 1
     		}

     		if (!bandera && command.venta != 0) {
     			command.type = 2
     		}

     		if (command.abiertas) {
     			state.push(0, 5, 6);
     		}

     		if (command.ejecutadas) {
     			state.push(1, 9);
     		}

     		if (command.canceladas) {
     			state.push(2, 7, 8);
     		}

     		if (command.pausadas) {
     			state.push(3);
     		}

     		if (state.length == 0) {
     			state = null;
     		}

     		if (command.desde >0) {
     			fromOrdernumber = command.desde;
     		}

     		if (command.hasta >0) {
     			toOrdernumber = command.hasta;
     		}

        if (command.cantidadRegistro >0) {
          pagesize = command.cantidadRegistro;
        }

     	 	updateOrders({
       			fromOrdernumber: fromOrdernumber,
            sortBy: "ordernumber",
            sortDirection: "desc",
            pagesize: pagesize,
            pagenumber: 1,
            states : state,
            toOrdernumber: toOrdernumber,
            type: command.type
        });

		}
		
		function paramsDefault() {
			return {
          sortBy: "ordernumber",
          sortDirection: "desc",
          pagesize: 5,
          pagenumber: 1,
      }   
		}
	
		function updateOrders(params) {
      ordersService.handle(
				params, 
				updateOrdersSuccess,
				updateOrdersFailed
			);
      
		}

		function updateOrdersSuccess(response) {
			setOrders(orderMap(response.results.orders));
		}

    function setOrders(orders) {
      $scope.orders = orders;
      $scope.orders = historicoMap($scope.orders, collapseAll);
      console.log('$scope.orders');
      console.log($scope.orders);
    }

		function updateOrdersFailed(response) {
			console.log(response);
		}

		function orderMap(response) {
			return response.map(function(order) {
				if(order.type == 1){ order.type = "Comprar"; }
        if(order.type == 2){ order.type = "Vender"; }
        if(order.state == 0){ order.state = "Abierta"; }
        if(order.state == 1){ order.state = "1"; }
        if(order.state == 2){ order.state = "Cancelada"; }
        if(order.state == 3){ order.state = "Pausada"; }
        if(order.state == 4){ order.state = "4"; }
        if(order.state == 5){ order.state = "5"; }
        if(order.state == 6){ order.state = "6"; }
        if(order.state == 7){ order.state = "Cancelada"; }
        if(order.state == 8){ order.state = "Cancelada"; }
        if(order.limit == null){ order.limit = "al mejor"; }
        if(order.pauseNoCredit == true){ order.pauseNoCredit = "Si"; }
        if(order.pauseNoCredit == false){ order.pauseNoCredit = "No"; }

        return order;
			});
		}

    function collapseAll() {
      console.log('colpáse'); 
        $scope.orders.forEach(function(order) {
            order.collapseOut();
        });
    }

    

		init();

	}

})();



