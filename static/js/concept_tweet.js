 
        
function drowtweet() 
{   
    click_data3 = d3.select(this).node().__data__; 
    document.getElementById("concept-tweet").innerHTML = ""
    var tweet_id = click_data3.tweetid
    
    //console.log(tweet_id) // [tweetID,tweetID,tweetID]
    if (tweet_id == undefined) {return;}
    jQuery(tweet_id).each( function( t,id ) {
        twttr.widgets.createTweet(
            id,
            document.getElementById("concept-tweet"),
            {
                width        : '95%',
                align        : 'center',
                cards        : 'visible',
                conversation : 'none',
                linkColor    : 'blue',
            }
        
        );
    });

}