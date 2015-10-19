app.controller('PlaylistCtrl', function ($state, $scope, thePlaylist, PlayerFactory, SongFactory, PlaylistFactory) {

  $scope.playlist = thePlaylist;
  $scope.isCurrent = function (song) {
    var current = PlayerFactory.getCurrentSong();
    return current && current._id == song._id;
  };

  $scope.start = function (song) {
    PlayerFactory.start(song, $scope.playlist.songs);
  };

  SongFactory.fetchAll()
  .then(function(songs) {
    $scope.songs = songs;
    $scope.songs = PlaylistFactory.removeDuplicates($scope.songs, $scope.playlist.songs)
  })

  $scope.addSong = function() {
    SongFactory.addSong($scope.songId, $scope.playlist._id)
    .then(function (song) {
      $scope.playlist.songs.push(song);
      $scope.songId = ''; 
      $scope.songs = PlaylistFactory.removeDuplicates($scope.songs, $scope.playlist.songs)
    })
  }

  $scope.removeSong = function(songRemoved){
    $scope.playlist.songs = $scope.playlist.songs.filter(function(song){
      return song._id !== songRemoved._id;
    })
    PlaylistFactory.removeSong(songRemoved, $scope.playlist._id);
  }

})