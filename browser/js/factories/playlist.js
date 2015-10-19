app.factory('PlaylistFactory', function ($http, SongFactory, ArtistFactory) {
  plFactory = {};
  var cachedPlaylists = [];
  
  plFactory.create = function(name){
    return $http.post('/api/playlists/', {name: name})
    .then(function(res){
      var playlist = res.data;
      cachedPlaylists.push(playlist);
      return playlist;
    });
  }
  
  plFactory.fetchAll = function () {
    return $http.get('/api/playlists')
    .then(function (response) {
      angular.copy(response.data, cachedPlaylists);
      return cachedPlaylists;
    });
  };

  plFactory.fetchById = function(id) {
    var foundPlaylist;
    return $http.get('/api/playlists/' + id)
      .then(function (response) {
        return response.data;
      })
      .then(function(playlist) {
        foundPlaylist = playlist;
        return ArtistFactory.fetchAll()
      })
      .then(function(artists) {  
        foundPlaylist.songs = foundPlaylist.songs.map(function(song) {
          return SongFactory.convert(song, artists);
        });
        return foundPlaylist;
      })
  }

  plFactory.removeDuplicates = function (scopeSongs, playlistSongs){
    return scopeSongs.filter(function(songOption){
      return playlistSongs.every(function(song) {
        return songOption._id !== song._id;
      })
    })
  }

  plFactory.removeSong = function(songRemoved, playlistId){
    $http.delete("/api/playlists/" + playlistId + "/songs/" + songRemoved._id);
  }

  return plFactory;
})

