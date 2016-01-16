var app;
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

	app = new App();
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

.controller('MenuCtrl', function($scope, $ionicPopup, $ionicHistory) {
	app.log("Menu ctrl...");

	$scope.lists = app.getLists();

	$scope.setCurrentList = function(list) {
		app.log("seting Current list: " + list.name);
		app.setCurrentList(list);
		$scope.currentList = list;
	}

	$scope.showAddListPopup = function() {
		$scope.data = {};

		var myPopup = $ionicPopup.show({
			template : 'Name: <input type="text" placeholder="List name" ng-model="data.newListName">',
			title : 'Add new shopping list',
			scope : $scope,
			buttons : [ {
				text : 'Cancel'
			}, {
				text : '<b>Save</b>',
				type : 'button-positive',
				onTap : function(e) {

					if ($scope.data.newListName != undefined) {
						app.addNewList(new List(123, $scope.data.newListName));
						return $scope.data.newListName;
					} else {
						e.preventDefault();
					}
				}
			}]
		})
	}

})

.controller('ListCtrl', function($scope, $stateParams) {
	app.log("ListCtrl ..."+$stateParams.listId);
	$scope.$on('$ionicView.afterEnter', function() {
		app.log("ListCtrl ...2");
		$scope.currentList = app.findList($stateParams.listId);
	});
	
	$scope.deleteEnabled = false;
	
	if ($scope.currentList == undefined)
		$scope.showAddListPopup();
	app.log("*Current list: " + $scope.currentList.name);
	$scope.items = $scope.currentList.items;
	$scope.currentList = app.findList($stateParams.listId);

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

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
