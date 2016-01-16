// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [ 'ionic', 'starter.controllers' ])

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
	}).state('app.list', {
		url : '/list',
		views : {
			'menuContent' : {
				templateUrl : 'templates/list.html',
				controller : 'ListCtrl'
			}
		}
	})

	.state('app.single', {
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

	this.getFromStorage = function() {
		if (window.localStorage['lists'] != undefined)
			return JSON.parse(window.localStorage['lists']);
	}

	/**
	 * Persists data to storage.
	 */
	this.persistToStorage = function(data) {
		window.localStorage['lists'] = JSON.stringify(data);
	}
	
	this.log = function(text) {
		console.log(text);
	}
}

var List = function(id, name, description) {
	this.id = id;
	this.name = name;
	this.items = [];
	this.description = description || "";
	this.geoposition = "";

};

var Item = function(name, description) {
	this.name = name;
	this.description = description;
	this.quantity = 1;
	this.image;

}
