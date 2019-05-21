var channelName = 'AcadeMedia';

$(document).ready(function(){
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyAksqndsJ-IizEeldUx3CH-4PsQ5hLzLEg'
        },
        function (data){
            $.each( data.items, function(idx, item){
                pid = item.contentDetails.relatedPlaylists.uploads;
                getVids(pid);
            })
        }
    )

    function getVids(pid){
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: 4,
                playlistId: pid,
                key: 'AIzaSyAksqndsJ-IizEeldUx3CH-4PsQ5hLzLEg'
            },
            function (data){
                var output;
                $.each( data.items, function(idx, item){
                    videoTitle = item.snippet.title;
                    videoId = item.snippet.resourceId.videoId;
                    output = '<li><iframe src="//www.youtube.com/embed/'+videoId+'"></iframe></li>';
                    $('#results').append(output);
                })
            }
        )  
    }
});