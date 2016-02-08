var app;

angular.module('i3.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

	app = new App();
	idb = new IDB();
	idb.initDB();
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

.controller('MenuCtrl', function($scope, $ionicPopup, $ionicHistory, $state) {
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
						app.addNewList(new List($scope.data.newListName, $scope.data.newListName));
						$scope.setCurrentList(app.getCurrentList());

						$state.go("app.list");
						return $scope.data.newListName;
					} else {
						e.preventDefault();
					}
				}
			} ]
		})
	}

})

.controller('ListCtrl', function($scope, $stateParams, $ionicPopover, $q, $timeout) {
	app.log("ListCtrl ..." + $stateParams.listId);

	var catalog = app.getCatalog();
	$scope.deleteEnabled = false;
	$scope.form = {};

	$ionicPopover.fromTemplateUrl('menu-popover.html', {
		scope : $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});

	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});

	$ionicPopover.fromTemplateUrl('hint-popover.html', {
		scope : $scope
	}).then(function(popover) {
		$scope.hintPopover = popover;
	});

	$scope.$on('$destroy', function() {
		$scope.hintPopover.remove();
	});

	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};

	app.findList($stateParams.listId, function(list) {
		$scope.currentList = list;
	});

	if ($scope.currentList == undefined)
		$scope.showAddListPopup();
	else {
		app.log("*Current list: " + $scope.currentList.name);
		$scope.items = $scope.currentList.items;
		$scope.purchasedItems = $scope.currentList.purchasedItems;
	}

	$scope.toChartItem = function(index) {
		$scope.purchasedItems.push($scope.items[index]);
		$scope.items.splice(index, 1);
		persistToStorage($scope.lists);
	}

	$scope.undoToChartItem = function(index) {
		$scope.items.push($scope.purchasedItems[index]);
		$scope.purchasedItems.splice(index, 1);
		persistToStorage($scope.lists);
	}

	$scope.addItem = function(input) {
		if (input != undefined && input != "") {
			app.log("Dodajam: " + input);
			var item = new Item(input);
			if ($scope.items.indexOf(item) < 0) {
				$scope.items.unshift(item);
				persistToStorage($scope.lists);
			}

			if (catalog.items.indexOf(item) < 0) {
				catalog.items.push(new CatalogItem(new Date().getTime(), input, ""));
				app.setCatalog(catalog);
			}

			$scope.form.addInput = '';
			$scope.hits = [];
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
		$scope.popover.hide();
		if ($scope.deleteEnabled)
			$scope.deleteEnabled = false;
		else
			$scope.deleteEnabled = true;
	}

	var search = function(key, $event) {
		if (key != "") {
			var matches = app.getCatalog().items.filter(function(item) {
				if (item.name.toLowerCase().indexOf(key.toLowerCase()) !== -1)
					return true;
			});
		}
		return matches;
	}

	$scope.complete = function(key, $event) {
		app.log("=" + key);
		$scope.hits = search(key, $event);
	}

	var persistToStorage = function(lists) {
		// window.localStorage['lists'] = JSON.stringify(lists);
		app.persistToStorage(lists);
	}

	$scope.hideHits = function() {
		$scope.deleteEnabled = false;
		$scope.hits = [];
	}

})

.controller('CatalogCtrl', function($scope, $stateParams) {

	$scope.catalog = app.getCatalog();

})

.controller('SettingsCtrl', function($scope, $stateParams) {

	var db = new IDB();
	db.initDB();

	$scope.initDb = function() {
		db.addToCatalog({
			"id" : new Date().getTime(),
			"name" : "Bobo2"
		});

		// db.closeDB();
	}

});
