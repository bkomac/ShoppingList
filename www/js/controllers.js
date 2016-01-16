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

.controller('MenuCtrl', function($scope) {
	console.log("Menu ctrl...");
	var app = new App();
	$scope.lists = app.getFromStorage();

})

.controller('ListCtrl', function($scope) {

	var app = new App();
	var list = new List();

	$scope.deleteEnabled = false;
	$scope.items = list.items;

	if ($scope.lists == undefined) {
		$scope.lists = [ {
			name : 'Špar',
			items : $scope.items
		}, {
			name : 'Merkur',
			items : $scope.items
		}, {
			name : 'Mercator',
			items : $scope.items
		} ];
	}

//	if (window.localStorage['lists'] == undefined) {
//		window.localStorage['lists'] = JSON.stringify($scope.lists);
//	} else
//		$scope.lists = JSON.parse(window.localStorage['lists']);

	$scope.selectedList = $scope.lists[0];
	$scope.items = $scope.selectedList.items;

	$scope.addItem = function(input) {
		if (input != undefined) {
			console.log("Dodajam: " + input);

			$scope.items.unshift({
				title : input,
				description : 'Nov artikel',
				image : 'Alpsko_mleko_3.5_m.m_1L.jpg'
			});
			persistToStorage($scope.lists);
		}
	};

	$scope.edit = function(item) {
		console.log("edit:" + item.title);
	}

	$scope.moveItem = function(item, fromIndex, toIndex) {
		console.log("form:" + fromIndex + " to:" + toIndex);
		$scope.items.splice(fromIndex, 1);
		$scope.items.splice(toIndex, 0, item);
		persistToStorage($scope.lists);
	};

	$scope.deleteItem = function(index) {
		$scope.items.splice(index, 1);
		persistToStorage($scope.lists);
	}

	$scope.tolledgeDelete = function() {
		if ($scope.deleteEnabled)
			$scope.deleteEnabled = false;
		else
			$scope.deleteEnabled = true;
	}

	var persistToStorage = function(lists) {
		// window.localStorage['lists'] = JSON.stringify(lists);
		app.persistToStorage(lists);
	}

	var list = new List();
	list.name = "Špar";

	list.items.push(new Item("Mleko", "Mlečni izdelek"));

	app.persistToStorage(list);

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
