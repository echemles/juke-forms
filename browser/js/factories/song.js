app.factory('SongFactory', function ($http) {
	var SongFactory = {};
	SongFactory.fetchAll = function() {
		return $http.get('/api/songs')
		.then(function (response) {
			return response.data;
		})
		.then(function (songs) {
			return songs.map(SongFactory.convert);
		})
	}

	SongFactory.convert = function (raw, artistObjs) {
		if (typeof artistObjs == 'object') {
			var artistsById = _.indexBy(artistObjs, '_id');
			raw.artists = raw.artists.map(function (artistId) {
				return artistsById[artistId];
			});
		}
		raw.audioUrl = '/api/songs/' + raw._id + '.audio';
		return raw;
	};

	SongFactory.addSong = function (songId, playlistId) {
		return $http.post(`/api/playlists/${playlistId}/songs`, {song: songId})
		.then(function (res) {
			return res.data;
		})
		.then(function (song) {
			return SongFactory.convert(song)
		})
	}

	return SongFactory;
});