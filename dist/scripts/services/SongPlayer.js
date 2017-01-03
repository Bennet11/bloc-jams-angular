(function() {
    function SongPlayer(Fixtures) {
      /**
        we added fixtures as a parameter
        for us to determine the index of songs
        to move between them
      */

        var SongPlayer = {};

        var currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */

        var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
        };

        var pauseSong = function(song) {
          currentBuzzObject.pause();
          song.playing = false;
        };

        var stopSong = function(song) {
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
        }

        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song)
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
          /**
            we created getSongIndex to determine the index of songs
          */
        };


        SongPlayer.currentSong = null;

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song)
                playSong(song)

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };

        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          pauseSong(song)
        }

        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
            stopSong(song)
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
          /**
            we created this function to get the previous song
          **/
        };

        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex > currentAlbum.length) {
            stopSong(song)
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
        };
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
