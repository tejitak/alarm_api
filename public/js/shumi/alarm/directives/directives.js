var directives = angular.module("alarm.directives", []);

directives.directive('debug', function() {
    return {
        restrict: 'E',
        scope: {
            expression: '=val'
        },
        template: '<pre>{{debug(expression)}}</pre>',
        link: function(scope) {
            scope.debug = function(exp) {
                return angular.toJson(exp, true);
            };
        }
    }
});