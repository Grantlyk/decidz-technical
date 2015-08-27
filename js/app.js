angular.module('App', ['ui.router'])
	
	.controller('mainController', function(forecast){
		var vm = this;
		var myFirebaseRef = new Firebase("https://techtest.firebaseio.com/");
		vm.message = "Hello";

		forecast.get();
	})

	.factory('forecast', function($http){
		var forecast = [];
		return {
			get: function(){
				$http.get('http://api.forecast.io/forecast/acc5f50221d8db5d8e2ade64c6fa7e79/51.50722,0.12750')
				.then(function(response){
					console.log(response);
				});
			},
			list: function(){
				return forecast;
			}
		};
	})

	.factory('firebase', function($http){
		var reference = [];
		return {
			set: function(FirebaseRef, document){
				FirebaseRef.set({
					latitude: document.latitude,
					longitude: document.longitude,
					timezone: document.timezone
				});
			}
		};
	})

	.config(['$httpProvider', function($httpProvider) {
  	$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		$httpProvider.defaults.headers.common["Accept"] = "application/json";
		$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  }]);