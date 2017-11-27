angular.module('flapperNews', [])
.controller('MainCtrl', ['$scope', 'myFactory', function($scope, myFactory){
  $scope.articles = {};
  $scope.article = {};

  myFactory.getArticles().then(function (response) {
        $scope.articles = response;
  });
  $scope.addArticle = function(article){
  	if(angular.equals(article, {})) { return; }
    myFactory.addArticle(article).then(function(response){
      $scope.articles.push(response);
      $scope.article = {}
    });
  };
  $scope.updateArticle = function(article){
    if(angular.equals(article, {})) { return; }
    myFactory.updateArticle(article).then(function(response){
      $scope.article = {};
    });
  };
  $scope.editArticle = function(article){
    $scope.article = article;
  };

  $scope.deleteArticle = function(article) {
    myFactory.deleteArticle(article).then(function(response) {
      $scope.articles.splice($scope.articles.indexOf(article),1);
    });
  };

}])
.factory('myFactory', ['$http', function ($http) {
  var service = {}
  service.getArticles = function () {
    return $http.get('/articles.json').then(function(response) {
      return response.data;
    });
  }
  service.addArticle = function (article) {
    return $http.post('/articles.json', {article: article}).then(function(response) {
      return response.data;
    });
  }
  service.updateArticle = function (article) {
    
    let url = '/articles/'+article.id+'.json';
    return $http.put(url, {article: article}).then(function(response) {
      return response.data;
    });
  }
  service.deleteArticle = function (article) {
    
    let url = '/articles/'+article.id+'.json';
    return $http.delete(url).then(function(response) {
      return response.data;
    });
  }
  return service;
}]);

