angular.module('edubaeApp').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/about', {
            template: '<about></about>'
        }).when('/manage-class', {
            template: '<manage-class></manage-class>'
        }).when('/auth', {
            template: '<auth></auth>'
        }).when('/manage-students', {
            template: '<manage-students></manage-students>'
        }).when('/generate-test', {
            template: '<generate-test></generate-test>'
        }).otherwise('/auth');


        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }

]);