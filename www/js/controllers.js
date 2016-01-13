angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	// $scope.$on('$ionicView.enter', function(e) {
	// });

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope : $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$scope.closeLogin();
		}, 1000);
	};
})

.controller('ListCtrl', function($scope) {
	$scope.items = [];
	if (window.localStorage['list'] == undefined) {
		window.localStorage['list'] = JSON.stringify($scope.items);
	} else
		$scope.items = JSON.parse(window.localStorage['list']);

	$scope.addItem = function(input) {
		if (input != undefined) {
			console.log("Dodajam: " + input);

			$scope.items.push({
				title : input,
				description : 'Nov artikel'
			});

			window.localStorage['list'] = JSON.stringify($scope.items);
		}
	};

	$scope.edit = function(item) {
		console.log("edit:" + item.title);
	}

	$scope.moveItem = function(item, fromIndex, toIndex) {
		console.log("form:" + fromIndex + " to:" + toIndex);
		$scope.items.splice(fromIndex, 1);
		$scope.items.splice(toIndex, 0, item);
	};
	
	$scope.deleteItem = function(index) {
		$scope.items.splice(index, 1);
		window.localStorage['list'] = JSON.stringify($scope.items);
	}

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
