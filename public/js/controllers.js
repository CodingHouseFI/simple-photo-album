'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function() {

});

app.controller('newAlbumCtrl', function($scope, $state, Album) {
  $scope.createAlbum = () => {
    Album.create($scope.album)
      .then(res => {
        $state.go('albums');
      })
      .catch(err => {
        console.error('err:', err);
      });
  }
});

app.controller('newImageCtrl', function($scope, $state, $stateParams, Album) {
  let {albumId} = $stateParams;

  $scope.addImage = () => {
    Album.addImage(albumId, $scope.image)
      .then(res => {
        $state.go('album.show');
      })
      .catch(err => {
        console.error('err:', err);
      });
  }
});

app.controller('albumListCtrl', function($scope, Album, $state) {
  Album.getAll()
    .then(res => {
      console.log('res.data:', res.data);
      $scope.albums = res.data;
    })
    .catch(err => {
      console.error('err:', err);
    });

  $scope.goToAlbum = id => {
    console.log('id:', id);
    $state.go('album.show', {albumId: id});
  };
})

app.controller('albumShowCtrl', function($scope, $state, $stateParams, Album, SweetAlert) {

  $scope.renameAlbum = () => {
    SweetAlert.swal({
       title: "Rename Album",
       text: "Enter the new name of this album:",
       type: "input",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Save",
       cancelButtonText: "Cancel",
       closeOnConfirm: false,
       closeOnCancel: true }, 
    function(inputValue){ 
       if (inputValue) {
          Album.update($stateParams.albumId, {name: inputValue})
            .then(res => {
              $scope.album.name = inputValue;
              SweetAlert.swal("Success!", "Your album has been renamed.", "success");
            })
       }
    });
  };

  Album.getById($stateParams.albumId)
    .then(res => {
      $scope.album = res.data;
    })
    .catch(err => {
      console.error('err:', err);
    });

  $scope.deleteAlbum = () => {
    Album.delete($stateParams.albumId)
      .then(res => {
        $state.go('albums');
      })
      .catch(err => {
        console.error('err:', err);
      });
  }
});

app.controller('imageShowCtrl', function($scope, $state, $stateParams, Album) {
  let {albumId, imageId} = $stateParams;

  Album.getImage(albumId, imageId)
    .then(res => {
      $scope.image = res.data;
    })
    .catch(err => {
      console.error('err:', err);
    });

  $scope.removeImage = () => {
    Album.removeImage(albumId, imageId)
      .then(res => {
        $state.go('album.show');
      })
      .catch(err => {
        console.error('err:', err);
      });
  };
});
