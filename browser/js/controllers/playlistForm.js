app.controller('PlaylistFormCtrl', function ($state, $timeout, $scope, PlaylistFactory, $rootScope){

  $scope.submitPlaylist = function(){
    PlaylistFactory.create($scope.playlistName)
    .then(function(playlist) {
      $state.go('playlist', {playlistId: playlist._id}) 
    });
  }

  PlaylistFactory.fetchAll()
    .then(function(playlists){
    $scope.playlists = playlists;
  });
})