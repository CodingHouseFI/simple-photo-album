'use strict';

var app = angular.module('myApp', ['ui.router', 'oitozero.ngSweetAlert']);

app.run(function($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams) {
      $rootScope.state = toState;
    }
  );
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    .state('albums', { url: '/albums', templateUrl: '/html/albums.html', controller: 'albumListCtrl' })
    .state('newAlbum', { url: '/newAlbum', templateUrl: '/html/newAlbum.html', controller: 'newAlbumCtrl' })
    .state('album', { url: '/album/:albumId', templateUrl: '/html/album.html' })
    .state('album.show', { url: '/', templateUrl: '/html/albumShow.html', controller: 'albumShowCtrl' })
    .state('album.newImage', { url: '/newImage', templateUrl: '/html/newImage.html', controller: 'newImageCtrl' })
    .state('album.image', { url: '/:imageId', templateUrl: '/html/image.html', controller: 'imageShowCtrl' })

  $urlRouterProvider.otherwise('/');
});
