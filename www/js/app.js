// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('i3', [ 'ionic', 'i3.controllers' ])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory
		// bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url : '/app',
		abstract : true,
		templateUrl : 'templates/menu.html',
		controller : 'AppCtrl'
	})

	.state('app.search', {
		url : '/search',
		views : {
			'menuContent' : {
				templateUrl : 'templates/search.html'
			}
		}
	})

	.state('app.browse', {
		url : '/browse',
		views : {
			'menuContent' : {
				templateUrl : 'templates/browse.html'
			}
		}
	}).state('app.listId', {
		url : '/list/:listId',
		views : {
			'menuContent' : {
				templateUrl : 'templates/list.html',
				controller : 'ListCtrl'
			}
		}
	}).state('app.list', {
		url : '/list',
		views : {
			'menuContent' : {
				templateUrl : 'templates/list.html',
				controller : 'ListCtrl'
			}
		}
	}).state('app.singleId', {
		url : '/playlists/:playlistId',
		views : {
			'menuContent' : {
				templateUrl : 'templates/playlist.html',
				controller : 'PlaylistCtrl'
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/list');
});

/**
 * Main App class
 */
var App = function() {

	this.lists;
	this.currentList;

	this.getLists = function() {
		if (this.lists == undefined)
			this.lists = this.getFromStorage();

		return this.lists;
	}

	this.findList = function(id, callback) {
		var found = false;
		this.getLists().forEach(function(list) {
			if (list.id == id) {
				app.log("Found list: " + list.name);
				callback(list);
				found = true;
			}
		});

		if (!found) {
			var lists = app.getLists();
			if (lists != undefined && lists.length > 0) {
				app.log("Vrnemo prvi list...");
				callback(lists[0]);
			} else {
				app.log("Vrnemo prvi undefined...");
				callback(undefined);
			}
		}
	}

	this.getCurrentList = function() {
		if (this.currentList == undefined)
			this.currentList = this.getLists()[0];

		return this.currentList;
	}

	this.setCurrentList = function(list) {
		this.currentList = list;
	}

	this.getFromStorage = function() {
		if (window.localStorage['lists'] != undefined)
			return JSON.parse(window.localStorage['lists']);
		else
			return [];
	}

	this.persistToStorage = function(data) {
		window.localStorage['lists'] = JSON.stringify(data);
	}

	this.addNewList = function(newList) {
		this.log("Adding new list: " + newList.name);
		this.getLists().unshift(newList);
		this.currentList = newList;
		this.persistToStorage(this.lists);
		
	}

	this.log = function(text) {
		console.log(text);
	}
}

var List = function(id, name, description) {
	this.id = id || 0;
	this.name = name || "";
	this.items = [];
	this.purchasedItems = [];
	this.description = description || "";
	this.geoposition = "";

};

var Item = function(name, description) {
	this.name = name;
	this.description = description;
	this.quantity = 1;
	this.image;

}
