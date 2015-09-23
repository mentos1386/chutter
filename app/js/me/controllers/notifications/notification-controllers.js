(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("notificationListCtrl", [
    "$scope", "Page", function($scope, Page) {
      return $scope.page = Page;
    }
  ]);

  app.controller("notificationsPageCtrl", [
    "$scope", "Notifications", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", function($scope, Notifications, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer) {
      $scope.fetchMoreComments = function() {};
      this.page = Page;
      this.post = Post;
      this.postService = PostService;
      this.notifications = Notifications;
      this.resource = CommentResource;
      this.mediaPlayer = MediaPlayer;
      return this;
    }
  ]);

}).call(this);
