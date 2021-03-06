(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("statsCtrl", [
    "$scope", "Stats", function($scope, Stats) {
      $scope.stats = Stats;
      console.log(typeof $scope.stats);
      _.map($scope.stats, function(obj) {
        return _.mapObject(obj, function(value, key) {
          $scope[key] = {};
          $scope[key].labels = _.keys(value);
          return $scope[key].data = _.values(value);
        });
      });
      $scope.point_distribution.data = [$scope.point_distribution.data];
      return $scope.onClick = function(points, evt) {
        return console.log(points, evt);
      };
    }
  ]);

}).call(this);
