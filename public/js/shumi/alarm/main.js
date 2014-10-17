var app = angular.module("alarm", ["ngRoute", "ngAnimate", "ngMaterial", "alarm.controllers", "alarm.services"]);

app.config(["$routeProvider", function($routeProvider){
    $routeProvider.when("/", {
        controller: "ListCtrl",
        templateUrl: "/js/shumi/alarm/views/list.html"
        // resolve: {
        //     alarms: function(MultiAlarmLoader){
        //         return MultiAlarmLoader();
        //     }
        // }
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