app.controller("SearchController",function(e,t,n){e.search_input="";e.added_songs=[];var r=0;e.getData=function(n){var r="http://ws.spotify.com/search/1/track.json?q="+n;t.get(r).then(function(t){t.data.tracks.length==0?e.no_results=!0:e.no_results=!1;e.data=t.data.tracks})};e.sendSong=function(t,n){function o(){r-=1;if(r<=0){e.$apply(function(){e.showNotif=!1});clearInterval(s);return}}var i=io.connect("http://87.255.55.193:8080/");e.showNotif=!0;i.emit("clients",{sendSongId:t});e.added_songs.push(t);e.songName=n;if(r==0)var s=setInterval(o,1e3);r=3};e.checkIfAdded=function(t){if(e.added_songs.indexOf(t)>-1)return!0}});