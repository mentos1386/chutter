(function() {
  var app;

  app = angular.module("Chutter");

  app.factory("PostService", [
    "PostResource", "$stateParams", "MediaPlayer", "$mdBottomSheet", "$mdToast", "$rootScope", function(PostResource, $stateParams, MediaPlayer, $mdBottomSheet, $mdToast, $rootScope) {
      var PostService;
      PostService = (function() {
        function PostService() {}

        PostService.prototype.updateVote = function(post, vote) {
          var delta;
          post.vote = post.vote || 0;
          post.vote = parseInt(post.vote);
          vote = parseInt(vote);
          if (post.vote === vote) {
            vote = 0;
          }
          delta = parseInt(vote) - parseInt(post.vote);
          console.log(delta);
          post.vote = vote;
          post.points = parseInt(post.points) + delta;
          return PostResource.vote({
            id: post.id,
            vote: vote
          });
        };

        PostService.prototype.moderate = function(post) {
          if ($rootScope.user && $rootScope.user.moderator) {
            return $mdBottomSheet.show({
              templateUrl: '../app/partials/shared/modSheet.html',
              parent: angular.element(document.body),
              disableParentScroll: true,
              locals: {
                entityable: post,
                entityableType: "post"
              },
              controller: "modSheetCtrl"
            });
          }
        };

        PostService.prototype.report = function(post) {
          return $mdBottomSheet.show({
            templateUrl: '../app/partials/shared/reportSheet.html',
            parent: angular.element(document.body),
            disableParentScroll: true,
            locals: {
              entityable: post,
              entityableType: "post"
            },
            controller: "reportSheetCtrl"
          }).then(function(reported) {
            if (reported) {
              return $mdToast.show($mdToast.simple().content('Post Reported.'));
            }
          });
        };

        PostService.prototype.toggleSave = function(post) {
          if ($rootScope.user && $rootScope.user.id) {
            if (post.saved) {
              post.saved = false;
              return PostResource.unsave_post({
                id: post.id
              });
            } else {
              post.saved = true;
              return PostResource.save_post({
                id: post.id
              });
            }
          } else {
            return $rootScope.$broadcast('auth:show-signin');
          }
        };

        PostService.prototype.getBackgroundImage = function(post) {
          if (post && post.media && post.media.length > 0) {
            if (post.media[0].thumbnail_link && post.media[0].thumbnail_link.length > 0) {
              return "url(" + post.media[0].thumbnail_link + ")";
            } else {
              return "url('/img/character.svg')";
            }
          } else {
            return "none";
          }
        };

        return PostService;

      })();
      return new PostService;
    }
  ]);

}).call(this);
