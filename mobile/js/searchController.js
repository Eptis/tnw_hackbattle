app.controller('SearchController', function($scope, $http, $timeout) {
    $scope.search_input = '';
    $scope.added_songs = [];
        var count=0;


    $scope.getData = function (query){
        // var url = "http://ws.spotify.com/search/1/track.json?q=" + query
        var url = "http://rijksmuseum.donnywals.com/feed.json"

        $http.get(url).then(function(res){
            if(res.data.tracks.length == 0){
                $scope.no_results = true;
            }else{
                $scope.no_results = false;
            }
            $scope.data = res.data.tracks;                
        });
    }
    $scope.sendSong = function(songId, songName){
        var socket = io.connect('http://87.255.55.193:8080/');
        $scope.showNotif = true;
        socket.emit('clients', {sendSongId: songId});  
        $scope.added_songs.push(songId);
        
        $scope.songName = songName;
        
        if(count == 0){
           var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
        }
        count = 3;
        function timer()
        {
          count = count-1;
          if (count <= 0)
          {
            $scope.$apply(function(){
                    $scope.showNotif = false;
                }
            );
             clearInterval(counter);
             return;
          }
        }

    }

    $scope.checkIfAdded = function(songId){
        if($scope.added_songs.indexOf(songId) > -1){
            return true
        }
    }

});
