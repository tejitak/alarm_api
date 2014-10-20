var app = angular.module("alarm", ["ngRoute", "ngAnimate", "ngMaterial", "facebook", "alarm.config", "alarm.controllers", "alarm.services"]);

app.config(["$routeProvider", "FacebookProvider", "fbClientId", function($routeProvider, FacebookProvider, fbClientId){
    // setup facebook auth
    FacebookProvider.init(fbClientId);

    $routeProvider.when("/", {
        controller: "ListCtrl",
        templateUrl: "/js/shumi/alarm/views/list.html"
    }).when("/edit/:alarmId", {
        controller: "EditCtrl",
        templateUrl: "/js/shumi/alarm/views/edit.html"
        // resolve: {
        //     alarm: function(AlarmLoader){
        //         return AlarmLoader();
        //     }
        // }
    }).when("/view/:alarmId", {
        controller: "ViewCtrl",
        templateUrl: "/js/shumi/alarm/views/view.html"
        // resolve: {
        //     alarm: function(AlarmLoader){
        //         return AlarmLoader();
        //     }
        // }
    }).when("/new", {
        controller: "NewCtrl",
        templateUrl: "/js/shumi/alarm/views/new.html"
    }).otherwise({redirectTo: "/"});
}]);