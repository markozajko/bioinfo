angular.module('bioinfo', [
  'bioinfo.controllers',
  'bioinfo.services',
  'bioinfo.directives',
  'ngRoute',
  'ui.toggle',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/", {templateUrl: "views/base.html", controller: "bioinfoCtrl"})
				.otherwise({redirectTo: '/'});
}]);