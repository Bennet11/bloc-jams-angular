(function() {
  function PlayerBarCtrl(fixtures, SongPlayer){
    this.albumData = Fixtures.getAlbum();
    this.SongPlayer = SongPlayer;
  }

  angular
    .module('blocJams')
    .controller('PlayerBarCtrl', ['fixtures', 'SongPlayer', PlayerBarCtrl])
})();
