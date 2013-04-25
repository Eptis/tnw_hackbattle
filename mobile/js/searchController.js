app.controller('SearchController', function($scope, $http) {
    $scope.search_input = '';
    $scope.added_songs = [];
    $scope.getData = function (query){
        var url = "http://ws.spotify.com/search/1/track.json?q=" + query
        $http.get(url).then(function(res){
            if(res.data.tracks.length == 0){
                $scope.no_results = true;
            }else{
                $scope.no_results = false;
            }
            $scope.data = res.data.tracks;                
        });
    }
    $scope.sendSong = function(songId){
        var socket = io.connect('http://87.255.55.193:8080/');
        socket.emit('clients', {sendSongId: songId});  
        $scope.added_songs.push(songId)
    }

    $scope.checkIfAdded = function(songId){
        if($scope.added_songs.indexOf(songId) > -1){
            return true
        }
    }

});
