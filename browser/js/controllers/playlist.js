app.controller('PlaylistCtrl', function ($scope, thePlaylist, PlayerFactory) {
  $scope.playlist = thePlaylist;

  $scope.isCurrent = function (song) {
    var current = PlayerFactory.getCurrentSong();
    return current && current._id == song._id;
  };

  $scope.start = function (song) {
    PlayerFactory.start(song, $scope.album.songs);
  };
})