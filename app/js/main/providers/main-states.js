(function() {
  'use strict';
  var app;

  app = angular.module("MainApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var create, frontpage, frontpage_comments, frontpage_community, frontpage_community_hot, frontpage_community_new, frontpage_community_top, frontpage_hot, frontpage_new, frontpage_submit, frontpage_top, interests, network_comments, network_community, network_community_hot, network_community_new, network_community_top, network_frontpage, network_frontpage_hot, network_frontpage_new, network_frontpage_top, register, view_url, welcome;
      view_url = "../app/partials/main";
      $urlRouterProvider.when('', '/');
      $urlRouterProvider.when('/u/:username', '/u/:username/overview');
      $urlRouterProvider.otherwise('/');
      frontpage = {
        name: "frontpage",
        abstract: true,
        data: {
          context: "frontpage"
        },
        onEnter: [
          "Page", function(Page) {
            Page.selectedCommunityTab = 0;
            Page.mainToolbar = "md-primary";
            return Page.secondaryToolbar = "md-hue-2";
          }
        ],
        views: {
          "toolbar": {
            templateUrl: "../app/partials/main/toolbar.html",
            controller: "toolbarCtrl"
          },
          "": {
            templateUrl: view_url + "/posts.html"
          },
          "right-rail": {
            template: "<all-sidebar></all-sidebar>"
          }
        },
        resolve: {
          Networks: [
            "NetworkResource", function(NetworkResource) {
              return NetworkResource.query().$promise;
            }
          ],
          Communities: [
            "CommunityResource", function(CommunityResource) {
              return CommunityResource.query().$promise;
            }
          ]
        }
      };
      frontpage_hot = {
        name: "frontpage.hot",
        url: "/",
        data: {
          sorting: "hot"
        },
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "PostResource", function(PostResource) {
                  return PostResource.query({
                    sort: "hot"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      frontpage_new = {
        name: "frontpage.new",
        url: "/new",
        data: {
          sorting: "new"
        },
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "PostResource", function(PostResource) {
                  return PostResource.query({
                    sort: "new"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      frontpage_top = {
        name: "frontpage.top",
        url: "/top",
        data: {
          sorting: "top"
        },
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "PostResource", function(PostResource) {
                  return PostResource.query({
                    sort: "top"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      frontpage_community = {
        name: "frontpage.community",
        url: "/c/:community",
        onEnter: [
          "Page", "Communities", "$stateParams", function(Page, Communities, $stateParams) {
            return Page.selectedCommunityTab = _.findIndex(Communities, {
              slug: $stateParams.community
            }) + 1;
          }
        ],
        abstract: true,
        resolve: {
          Community: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.show({
                id: $stateParams.community
              }).$promise;
            }
          ]
        },
        data: {
          context: "frontpage_community"
        },
        views: {
          "@frontpage": {
            templateUrl: view_url + "/communityPosts.html"
          },
          "right-rail@": {
            templateUrl: "../app/partials/main/sidebar/community-sidebar.html",
            resolve: {
              Moderators: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.moderators({
                    id: $stateParams.community
                  }).$promise;
                }
              ]
            },
            controller: [
              "$scope", "Community", "Moderators", "CommunityResource", function($scope, Community, Moderators, CommunityResource) {
                $scope.community = Community;
                $scope.moderators = Moderators;
                return $scope.requestModerationPosition = function() {
                  $scope.community.moderation_position_requested = true;
                  return CommunityResource.requestModerationPosition({
                    id: $scope.page.community.id
                  });
                };
              }
            ]
          }
        }
      };
      frontpage_community_hot = {
        name: "frontpage.community.hot",
        url: "",
        data: {
          sorting: "hot"
        },
        views: {
          "posts@frontpage": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.posts({
                    id: $stateParams.community,
                    sort: "hot"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      frontpage_community_new = {
        name: "frontpage.community.new",
        url: "/new",
        data: {
          sorting: "new"
        },
        views: {
          "posts@frontpage": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.posts({
                    id: $stateParams.community,
                    sort: "new"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      frontpage_community_top = {
        name: "frontpage.community.top",
        url: "/top",
        data: {
          sorting: "top"
        },
        views: {
          "posts@frontpage": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.posts({
                    id: $stateParams.community,
                    sort: "top"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network_frontpage = {
        name: "network_frontpage",
        url: "/n/:network",
        abstract: true,
        onEnter: [
          "Page", function(Page) {
            Page.selectedCommunityTab = 0;
            Page.mainToolbar = "md-hue-2";
            return Page.secondaryToolbar = "md-hue-3";
          }
        ],
        data: {
          context: "network_frontpage"
        },
        resolve: {
          Networks: [
            "NetworkResource", function(NetworkResource) {
              return NetworkResource.query().$promise;
            }
          ],
          Network: [
            "NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", "Page", function(NetworkResource, $stateParams, $state, $rootScope, $auth, Page) {
              return NetworkResource.show({
                id: $stateParams.network
              }).$promise;
            }
          ],
          Communities: [
            "NetworkResource", "$stateParams", function(NetworkResource, $stateParams) {
              return NetworkResource.communities({
                id: $stateParams.network
              }).$promise;
            }
          ]
        },
        views: {
          "toolbar": {
            templateUrl: "../app/partials/main/toolbar.html",
            controller: "networkToolbarCtrl"
          },
          "": {
            templateUrl: view_url + "/posts.html"
          },
          "right-rail": {
            templateUrl: "../app/partials/main/sidebar/network-sidebar.html",
            controller: [
              "$scope", "Network", function($scope, Network) {
                return $scope.network = Network;
              }
            ]
          }
        }
      };
      network_frontpage_hot = {
        name: "network_frontpage.hot",
        url: "",
        data: {
          sorting: "hot"
        },
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "NetworkResource", "$stateParams", function(NetworkResource, $stateParams) {
                  return NetworkResource.posts({
                    id: $stateParams.network,
                    sort: "hot"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network_frontpage_new = {
        name: "network_frontpage.new",
        url: "/new",
        data: {
          sorting: "new"
        },
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "NetworkResource", "$stateParams", function(NetworkResource, $stateParams) {
                  return NetworkResource.posts({
                    id: $stateParams.network,
                    sort: "new"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network_frontpage_top = {
        name: "network_frontpage.top",
        url: "/top",
        data: {
          sorting: "top"
        },
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "NetworkResource", "$stateParams", function(NetworkResource, $stateParams) {
                  return NetworkResource.posts({
                    id: $stateParams.network,
                    sort: "top"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network_community = {
        name: "network_frontpage.community",
        url: "/c/:community",
        onEnter: [
          "Page", "Communities", "$stateParams", function(Page, Communities, $stateParams) {
            return Page.selectedCommunityTab = _.findIndex(Communities, {
              slug: $stateParams.community
            }) + 1;
          }
        ],
        data: {
          sorting: "network_frontpage_community"
        },
        abstract: true,
        resolve: {
          Community: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.show({
                id: $stateParams.community
              }).$promise;
            }
          ]
        },
        views: {
          "@network_frontpage": {
            templateUrl: view_url + "/communityPosts.html"
          },
          "right-rail@": {
            templateUrl: "../app/partials/main/sidebar/community-sidebar.html",
            resolve: {
              Moderators: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.moderators({
                    id: $stateParams.community
                  }).$promise;
                }
              ]
            }
          },
          controller: [
            "$scope", "Community", "Moderators", "CommunityResource", function($scope, Community, Moderators, CommunityResource) {
              $scope.community = Community;
              $scope.moderators = Moderators;
              return $scope.requestModerationPosition = function() {
                $scope.community.moderation_position_requested = true;
                return CommunityResource.requestModerationPosition({
                  id: $scope.page.community.id
                });
              };
            }
          ]
        }
      };
      network_community_hot = {
        name: "network_frontpage.community.hot",
        url: "",
        data: {
          sorting: "hot"
        },
        views: {
          "posts@network_frontpage": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.posts({
                    id: $stateParams.community,
                    sort: "hot"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network_community_new = {
        name: "network_frontpage.community.new",
        url: "/new",
        data: {
          sorting: "new"
        },
        views: {
          "posts": {
            controller: "postListCtrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.posts({
                    id: $stateParams.community,
                    sort: "new"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network_community_top = {
        name: "network_frontpage.community.top",
        url: "/top",
        data: {
          sorting: "top"
        },
        views: {
          "posts": {
            controller: "postListCtrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.posts({
                    id: $stateParams.community,
                    sort: "top"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      frontpage_submit = {
        name: "frontpage.submit",
        url: "/submit",
        views: {
          "@": {
            templateUrl: view_url + "/submit.html",
            controller: "submitCtrl"
          },
          "right-rail@": {
            template: "<submission-sidebar page='page'></submission-sidebar>"
          }
        }
      };
      create = {
        name: "frontpage.create",
        url: "/create",
        views: {
          "@": {
            templateUrl: view_url + "/create/layout.html",
            controller: "createCtrl"
          },
          "right-rail": {
            template: "<all-sidebar></all-sidebar>"
          }
        }
      };
      frontpage_comments = {
        name: "frontpage.community.comments",
        url: "/:id",
        resolve: {
          Post: [
            "PostResource", "$stateParams", function(PostResource, $stateParams) {
              return PostResource.get({
                id: $stateParams.id
              }).$promise;
            }
          ],
          Comments: [
            "PostResource", "$stateParams", function(PostResource, $stateParams) {
              return PostResource.comments({
                id: $stateParams.id
              }).$promise;
            }
          ]
        },
        views: {
          "posts@frontpage": {
            templateUrl: view_url + "/comments.html",
            controller: "commentsPageCtrl as ctrl"
          },
          "right-rail@": {
            templateUrl: "../app/partials/main/sidebar/comments-sidebar.html",
            controller: [
              "$scope", "Community", function($scope, Community) {
                return $scope.community = Community;
              }
            ]
          }
        }
      };
      network_comments = {
        name: "network_frontpage.community.comments",
        url: "/:id",
        resolve: {
          Post: [
            "PostResource", "$stateParams", function(PostResource, $stateParams) {
              return PostResource.get({
                id: $stateParams.id
              }).$promise;
            }
          ],
          Comments: [
            "PostResource", "$stateParams", function(PostResource, $stateParams) {
              return PostResource.comments({
                id: $stateParams.id
              }).$promise;
            }
          ]
        },
        views: {
          "posts@network_frontpage": {
            templateUrl: view_url + "/comments.html",
            controller: "commentsPageCtrl as ctrl"
          },
          "right-rail@": {
            templateUrl: "../app/partials/main/sidebar/comments-sidebar.html",
            controller: [
              "$scope", "Community", function($scope, Community) {
                return $scope.community = Community;
              }
            ]
          }
        }
      };
      register = {
        name: "register",
        url: "/register",
        abstract: true
      };
      welcome = {
        name: "register.welcome",
        url: "/welcome",
        views: {
          "toolbar@": {
            template: '<md-toolbar id="main-toolbar"><div class="md-toobar-tools"><div id="logo"><md-button href="/"><img src="/img/logo.png" /></md-button></div></div></md-toolbar>'
          },
          "@": {
            templateUrl: view_url + "/registration/welcome.html",
            controller: "welcomeCtrl"
          },
          "right-rail@": {
            templateUrl: view_url + "/registration/privacy.html",
            controller: [
              "$scope", function($scope) {
                return $scope.privacyItems = {
                  "Your information is never for sale": "This means that we will only share your personal data with your consent, and after letting you know what information will be shared and with whom, unless it is otherwise permitted in this policy. We do not sell or otherwise give access to any information collected about our users to any third party.",
                  "Chutter will not disclose your information unless required by law": "We may disclose – or preserve for future disclosure – your information if we believe, after due consideration, that doing so is reasonably necessary to comply with a law, regulation, or valid legal process. If we are going to release your information, we will do our best to provide you with notice in advance via chutter's private messaging system unless we are prohibited by court order from doing so (e.g., an order under 18 U.S.C. § 2705(b)). We reserve the right to delay notice to users in cases involving the exploitation of minors and when we believe a delay is necessary to prevent imminent and serious bodily harm to a person.",
                  "Third party tools": "Chutter uses Google Analytics. It is an extremely common tool that many of your favorite sites use. Chutter simply uses this for approximating things like: how many users are on the site right now (for capacity planning), or what pages are experiencing issues/high-traffic.  No personally identifyable data is sent to google. For more information about how Google handles analytics data, please consult the [Google Privacy Policy](https://www.google.com/intl/en/policies/privacy/). You should consult the respective privacy policies of these third-party servers for more detailed information on their practices."
                };
              }
            ]
          }
        }
      };
      interests = {
        name: "register.interests",
        url: "/interests",
        onEnter: [
          "$auth", "$state", function($auth, $state) {
            return $auth.validateUser()["catch"](function() {
              return $state.transitionTo("register.welcome");
            });
          }
        ],
        resolve: {
          List: [
            'NetworkResource', function(NetworkResource) {
              return NetworkResource.list();
            }
          ],
          Networks: [
            "NetworkResource", function(NetworkResource) {
              return NetworkResource.query().$promise;
            }
          ],
          Communities: [
            "CommunityResource", function(CommunityResource) {
              return CommunityResource.query().$promise;
            }
          ]
        },
        views: {
          "toolbar@": {
            templateUrl: "../app/partials/main/toolbar.html",
            controller: "toolbarCtrl"
          },
          "@": {
            templateUrl: view_url + "/registration/interests.html",
            controller: "networkEditCtrl"
          },
          "right-rail@": {
            templateUrl: view_url + "/registration/faq.html"
          }
        }
      };
      $stateProvider.state(frontpage);
      $stateProvider.state(frontpage_hot);
      $stateProvider.state(frontpage_new);
      $stateProvider.state(frontpage_top);
      $stateProvider.state(frontpage_community);
      $stateProvider.state(frontpage_community_hot);
      $stateProvider.state(frontpage_community_new);
      $stateProvider.state(frontpage_community_top);
      $stateProvider.state(frontpage_comments);
      $stateProvider.state(network_frontpage);
      $stateProvider.state(network_frontpage_new);
      $stateProvider.state(network_frontpage_top);
      $stateProvider.state(network_frontpage_hot);
      $stateProvider.state(network_community);
      $stateProvider.state(network_community_hot);
      $stateProvider.state(network_community_new);
      $stateProvider.state(network_community_top);
      $stateProvider.state(network_comments);
      $stateProvider.state(frontpage_submit);
      $stateProvider.state(create);
      $stateProvider.state(register);
      $stateProvider.state(welcome);
      return $stateProvider.state(interests);
    }
  ]);

}).call(this);
