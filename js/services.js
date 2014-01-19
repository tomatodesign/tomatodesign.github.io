'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('tomato.services', []).
  service('flickr', ['$http', '$q', '$timeout', function($http, $q, $timeout) {

    var baseURL = 'https://api.flickr.com/services/rest?';
    var apiKey = '425b1a77794c3493f5ab8eadb76fa274';

    this.getPhotoset = function(id) {
      var deferred = $q.defer();
      var method = 'flickr.photosets.getPhotos';
      var url = baseURL + 'method=' + method + '&api_key=' + apiKey + '&photoset_id=' + id + '&format=json&nojsoncallback=1';
      
      $http.get(url).success(function(data) {
        deferred.resolve(data);
      }).error(function() {
        deferred.reject('发生未知错误，未获取到相册');
      });
      return deferred.promise;
    }
  }])
  .provider('HttpProgressInterceptor', function HttpProgressInterceptor() {
    this.$get = ['$injector', '$q', function($injector, $q) {
      var my = this;
      var ngProgressLite;

      this.getNgProgress = function() {
        ngProgressLite = ngProgressLite || $injector.get('ngProgressLite');
        return ngProgressLite;
      };

      return function(promise) {
        ngProgressLite = my.getNgProgress();
        // ngProgressLite.done();
        ngProgressLite.start();
        return promise.then(function(response) {
          ngProgressLite.done();
          return response;
        }, function(response) {
          ngProgressLite.done();
          return $q.reject(response);
        });
      }
    }]
  })