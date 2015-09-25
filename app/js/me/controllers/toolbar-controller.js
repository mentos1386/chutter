(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("toolbarCtrl", [
    "$auth", "$scope", "$mdDialog", "poller", "$mdToast", "API", "$state", "$location", "Page", function($auth, $scope, $mdDialog, poller, $mdToast, API, $state, $location, Page) {
      $scope.page = Page;
      $scope.$on("$stateChangeStart", function() {
        return $scope.loading = true;
      });
      $scope.$on("$stateChangeSuccess", function() {
        return $scope.loading = false;
      });
      $scope.applicationSectionNamespace = "frontpage";
      $scope.$on("auth:show-signin", function() {
        return $scope.logIn;
      });
      $scope.logIn = function() {
        return $mdDialog.show({
          controller: 'authCtrl',
          templateUrl: '../app/partials/main/authenticate.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };
      $scope.logout = function() {
        return $auth.signOut().then(function() {
          return $location.url("/");
        });
      };
      if ($scope.user && $scope.user.id) {
        $scope.poller = poller;
        $scope.poller.get(API.makeURL('/users/ephemeral_notifications'), {
          delay: 30000
        }).promise.then(null, null, function(data) {
          return $scope.showNotifications(data.data);
        });
      }
      $scope.$on("auth:logout-success", function() {
        return $scope.poller.stopAll();
      });
      $scope.$on("auth:login-success", function() {
        $scope.poller = poller;
        return $scope.poller.get(API.makeURL('/users/ephemeral_notifications'), {
          delay: 30000
        }).promise.then(null, null, function(data) {
          return $scope.showNotifications(data.data);
        });
      });
      $scope.showNotifications = function(notifications) {
        var cascade, ephemeral_notifications;
        ephemeral_notifications = _.reject(notifications, function(n) {
          return n.ephemeral_count === 0;
        });
        if (ephemeral_notifications.length > 0) {
          if (ephemeral_notifications.length > 1) {
            cascade = true;
          }
          return _.each(ephemeral_notifications, function(notification) {
            if (cascade) {
              return setTimeout(function() {
                return $scope.showNotification(notification);
              }, 5000);
            } else {
              return $scope.showNotification(notification);
            }
          });
        }
      };
      $scope.showNotification = function(notification) {
        var body, title;
        if (notification.entityable === "comment") {
          body = notification.body.substring(0, 50);
          if (body.length > 49) {
            body += "...";
          }
          return $mdToast.show($mdToast.simple().content("Re: " + body).position("bottom right").action(notification.ephemeral_count + " new").hideDelay(5000));
        } else if (notification.entityable === "post") {
          title = notification.title.substring(0, 50);
          if (title.length > 49) {
            title += "...";
          }
          return $mdToast.show($mdToast.simple().content("Re: " + title).position("bottom right").action(notification.ephemeral_count + " new").hideDelay(5000));
        }
      };
      $scope.editNetworks = function(ev) {
        if (!($scope.user && $scope.user.id)) {
          return $scope.logIn();
        } else {
          return $mdDialog.show({
            controller: 'networkEditCtrl',
            templateUrl: '../app/partials/main/networkEdit.html',
            clickOutsideToClose: true,
            preserveScope: true,
            scope: $scope,
            parent: angular.element(document.body),
            targetEvent: ev,
            resolve: {
              List: [
                'NetworkResource', function(NetworkResource) {
                  return NetworkResource.list();
                }
              ]
            }
          });
        }
      };
      return $scope.editNetworkCommunities = function(network) {
        return $mdDialog.show({
          controller: "communityEditCtrl",
          preserveScope: true,
          templateUrl: '../app/partials/main/communityEdit.html',
          scope: $scope,
          resolve: {
            List: [
              "NetworkResource", function(NetworkResource) {
                return NetworkResource.list_communities({
                  id: network.id
                });
              }
            ]
          },
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };
    }
  ]);

}).call(this);
