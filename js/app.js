'use strict';


// Declare app level module which depends on filters, and services
angular.module('tomato', [
  'ngRoute',
  'ngProgressLite',
  'tomato.filters',
  'tomato.services',
  'tomato.directives',
  'tomato.controllers'
]).
config(['$routeProvider', '$locationProvider', '$httpProvider', 'ngProgressLiteProvider',
  function($routeProvider, $locationProvider, $httpProvider, ngProgressLiteProvider) {

  $httpProvider.responseInterceptors.push('HttpProgressInterceptor');
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  ngProgressLiteProvider.settings.ease = 'ease-in-out';
  
  $locationProvider.html5Mode(false).hashPrefix('!');
  
  $routeProvider.when('/', { redirectTo: '/works/packages' });
  // $routeProvider.when('/welcome', { templateUrl: '/views/welcome.html', controller: 'welcome' });
  $routeProvider.when('/works', { redirectTo: '/works/packages' });
  $routeProvider.when('/works/:work', { templateUrl: '/views/works.html', controller: 'works' });
  $routeProvider.when('/opinion', { redirectTo: '/opinion/questions' });
  $routeProvider.when('/opinion/questions', { templateUrl: '/views/questions.html', controller: 'opinion' });
  $routeProvider.when('/opinion/principles', { templateUrl: '/views/principles.html', controller: 'opinion' });
  $routeProvider.when('/opinion/goal', { templateUrl: '/views/goal.html', controller: 'opinion' });
  $routeProvider.when('/cooperation', { redirectTo: '/cooperation/contract' });
  $routeProvider.when('/cooperation/contract', { templateUrl: '/views/contract.html', controller: 'cooperation' });
  $routeProvider.when('/cooperation/workflow', { templateUrl: '/views/workflow.html', controller: 'cooperation' });
  $routeProvider.when('/about', { redirectTo: '/about/tomato' });
  $routeProvider.when('/about/tomato', { templateUrl: '/views/tomato.html', controller: 'about' });
  $routeProvider.when('/about/members', { templateUrl: '/views/members.html', controller: 'about' });
  $routeProvider.when('/contact', { templateUrl: '/views/contact.html', controller: 'contact' });
  $routeProvider.when('/jobs', { templateUrl: '/views/jobs.html', controller: 'jobs' });
  $routeProvider.when('/blog', { templateUrl: '/views/blog.html', controller: 'blog' });
  $routeProvider.otherwise({ redirectTo: '/works/packages' });
}]);
