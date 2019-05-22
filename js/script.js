var channelId = 'UCafyxRv7ZULEC487nRaElZw';

$(document).ready(function(){
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            id: channelId,
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
                maxResults: 10,
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

    /*******************Alternate solution for instagram feeds. This will be depricated by 2020 from instagram */
    // var feed = new Instafeed({
    //     get: 'user',
    //     userId: '1694546717',
    //     tagName: 'awesome',
    //     clientId: '5ddc1e769f6145e7a2a25ba5ad4df854',
    //     accessToken: '1694546717.1677ed0.18df0bbaa4ef4f92b440d84c68f28c42'
    // });
    // feed.run();

    /***************Inhouse solution, which we can change according to our needs */
    $.get(
        "https://api.instagram.com/v1/users/self/media/recent/", {
            // get: 'user',
            // user_id: '1694546717',
            // tag_name: 'awesome',
            // client_id: '5ddc1e769f6145e7a2a25ba5ad4df854',
            access_token: '3290694562.bcc2598.31295cff56a548529d921216a73d6c46'
        }, 
        function(response){
            console.log(response);

            var output;
            $.each( response.data, function(idx, item){
                imageSrc = item.images.low_resolution.url;
                imageAlt = item.caption ? item.caption.text : 'Insta image'+idx;
                output = '<li><img src="'+imageSrc+'" alt="'+imageAlt+'"/></li>';
                $('#instafeed').append(output);
            })
        }
    );
});