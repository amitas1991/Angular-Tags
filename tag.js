angular.module("tags", [])
.constant("keyConfig",
	{"tabKey": 9}
)
.directive("tagManager", ["keyConfig", function(keyConfig) {
  return {
    restrict: "E",
    scope: { tags: "=" },
    template: "<div class='tags'><input type='text' ng-disabled='tags.length == maxTags' placeholder='Add a tag...' ng-model='newValue'></input><a ng-repeat='(id, tag) in tags' class='tag'>{{tag}} <i  ng-click='remove(id)'></i> </a></div>",
    link: function ( $scope, $element, attribs ) {
      var input = angular.element( $element.find("input") );
      $scope.maxTags = attribs.maxtags;
      $scope.add = function() {
          if(angular.isUndefined($scope.newValue) || $scope.newValue === "" || $scope.newValue === null) {
            $scope.alertMessages = [{msg: "Enter tag name", type: "error"}];
            return;
          }
          $scope.tags.push($scope.newValue);
          $scope.newValue = "";
      };

      $scope.remove = function (id) {
        $scope.tags.splice( id, 1 );
      };

      input.bind("keydown", function (event) {
        if (event.keyCode === keyConfig.tabKey) {
          $scope.$apply($scope.add);
          event.preventDefault();
        }
      });
    }
  };
}]);
