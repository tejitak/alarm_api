var controllers = angular.module("alarm.controllers");

controllers.controller("LoginDialogCtrl", ["$scope", "$controller", "$mdDialog", function($scope, $controller, $mdDialog){
    // reuse auth controlller
    var authCtrlScope = $scope.$new();
    $controller("AuthCtrl", {$scope: authCtrlScope});

    $scope.IntentLogin = function(){
        authCtrlScope.IntentLogin();
    };

    $scope.hide = function(){
        $mdDialog.hide();
    };
}]);