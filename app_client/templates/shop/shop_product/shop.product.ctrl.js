'use strict';
(function(){

	var app = angular.module("ShopProductCtrl", []);

	app.controller('ShopProductCtrl', function($scope, $stateParams, $timeout, dataService, cartService,  shopService){
		$scope.productview = ['/templates/shop/shop_product/shop.product.view.mobile.html', '/templates/shop/shop_product/shop.product.view.html']

		// Set the scope of currentSelectedProduct to equal the saved current product in the data service
		$scope.currentSelectedProduct = dataService.retrieveLocal('currentProduct');

		// Set the scope of current coordinates to be the coordinates
		$scope.currentCoordinates = dataService.retrieveLocal('coordinates');

		// Set the size of the size dropdown menu
		if ($scope.currentSelectedProduct && $scope.currentSelectedProduct.size){
			$scope.sizes = ['small','medium','large'];
		} else {
			alert('There is an error')
		}

		$scope.sizeDefault = 'small';

		$scope.changeDropdownSelected = function(item){
			$scope.sizeDefault = item;
		}

		$scope.loading = false;

		// Export all the aggragte product data to a lineItem
		$scope.exportProduct = function(){
			var lineItem = {
				lineItemID : $scope.sizeDefault + $scope.currentSelectedProduct._id + $scope.currentCoordinates.lat + $scope.currentCoordinates.lng,
				imgLink: $scope.currentSelectedProduct.imgLink,
				_id: $scope.currentSelectedProduct._id,
				description: $scope.currentSelectedProduct.description,
				name: $scope.currentSelectedProduct.name,
				price: $scope.currentSelectedProduct.price,
				size: $scope.sizeDefault,
				quantity: 1,
				latitude: $scope.currentCoordinates.lat,
				longitude: $scope.currentCoordinates.lng
			}

			$scope.loading = true;

			cartService.pushLineItem(lineItem);

			$timeout(function() {
				$scope.loading = false;
			}, 2000);

		}
	});
	
}());