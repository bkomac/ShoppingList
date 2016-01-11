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

.controller('PlaylistsCtrl', function($scope) {
	$scope.items = [];

	$scope.addItem = function(input) {
		console.log("Dodajam: " + input);

		$scope.items.push({
			title : input,
			id : 0,
			description : 'Good music'
		});
		
	};

	$scope.items = [ {
		title : 'Reggae',
		id : 1,
		description : 'Good music'
	}, {
		title : 'Chill',
		id : 2,
		description : 'Good music'
	}, {
		title : 'Dubstep',
		id : 3,
		description : 'Good music'
	}, {
		title : 'Indie',
		id : 4,
		description : 'Good music'
	}, {
		title : 'Rap',
		id : 5,
		description : 'Good music gg'
	}, {
		title : 'Cowbell',
		id : 6,
		description : 'Good music'
	} ];

	$scope.moveItem = function(item, fromIndex, toIndex) {
		console.log("form:" + fromIndex + " to:" + toIndex);
		$scope.items.splice(fromIndex, 1);
		$scope.items.splice(toIndex, 0, item);
	};

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
