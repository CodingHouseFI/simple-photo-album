'use strict';

var app = angular.module('myApp');

app.service('Album', function($http) {

  this.getAll = () => $http.get('/api/albums');
  this.getById = id => $http.get(`/api/albums/${id}`);
  this.create = album => $http.post('/api/albums', album);
  this.delete = id => $http.delete(`/api/albums/${id}`);
  this.update = (id, album) => $http.put(`/api/albums/${id}`, album);
  this.getImage = (albumId, imageId) => $http.get(`/api/albums/${albumId}/image/${imageId}`);
  this.addImage = (albumId, image) => $http.post(`/api/albums/${albumId}`, image);
  this.removeImage = (albumId, imageId) => $http.delete(`/api/albums/${albumId}/image/${imageId}`);

});
