var controllers = angular.module("alarm.controllers", ["ngMaterial", "alarm.config"]);

controllers.controller('SidebarCtrl', ["$scope", "$timeout", "$mdSidenav", function($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle();
    };
    $scope.close = function() {
        $mdSidenav('left').close();
    };
}]);

controllers.controller('ListCtrl', ["$scope", "appConfig", "MultiAlarmLoader", function($scope, appConfig, MultiAlarmLoader) {
    $scope.appConfig = appConfig;
    $scope.$watch("appConfig.accessToken", function(val){
        console.log("accessToken watcher:" + val);
        if(val){
            MultiAlarmLoader().then(function(alarms){
                $scope.alarms = alarms;
            });
        }else{
            $scope.alarms = [];
        }
    });
}]);

controllers.controller("NewCtrl", ["$scope", function(){

}]);