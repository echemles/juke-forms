app.factory('PlaylistFactory', function ($http, SongFactory) {
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
    return $http.get('/api/playlists/' + id)
      .then(function (response) {
        return response.data;
      })
  } 
  return plFactory;
})