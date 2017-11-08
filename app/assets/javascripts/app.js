angular.module('flapperNews', [])
.controller('MainCtrl', ['$scope', 'myFactory', function($scope, myFactory){
  $scope.articles = {};
  $scope.article = {};

  myFactory.getArticles().then(function (response) {
        $scope.articles = response;
  });
  $scope.addArticle = function(article){
  	if(!article) { return; }
    $scope.article = {};
  };
}])
.factory('myFactory', ['$http', function ($http) {
  var service = {}
  service.getArticles = function () {
    return $http.get('/articles.json').then(function(response) {
      return response.data;
    });
  }
  service.setArticle = function (article) {
    return $http.post('/article', article);
  }
  return service;
}]);

