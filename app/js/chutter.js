(function() {
  'use strict';
  var app;

  app = angular.module('Chutter', ['ui.router', 'ngMaterial', 'templates-shared', 'ng-token-auth', 'ngResource', 'emguo.poller', 'hc.marked', 'angularMoment', 'ngMessages']).constant('API', {
    baseURL: '/api/v1',
    makeURL: function(url) {
      return this.baseURL + url;
    }
  }).constant('angularMomentConfig', {
    preprocess: 'unix'
  }).config([
    '$locationProvider', '$authProvider', 'API', '$rootScopeProvider', function($locationProvider, $authProvider, API, $rootScopeProvider) {
      $rootScopeProvider.digestTtl(30);
      $authProvider.configure({
        apiUrl: API.baseURL
      });
      return $locationProvider.html5Mode(true);
    }
  ]).config(['$stateProvider', '$urlRouterProvider', '$compileProvider', function($stateProvider, $urlRouterProvider, $compileProvider) {}]).run([
    '$http', '$auth', function($http, $auth) {
      var headers;
      headers = void 0;
      headers = $auth.retrieveData('auth_headers');
      return $http.defaults.headers.common = $auth.retrieveData('auth_headers');
    }
  ]);

}).call(this);
