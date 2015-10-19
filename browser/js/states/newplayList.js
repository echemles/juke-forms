app.config(function ($stateProvider) {
    $stateProvider.state('newPlaylist', {
        url: '/playlists/new',
        templateUrl: '/templates/playlist-form.html'
    });
});