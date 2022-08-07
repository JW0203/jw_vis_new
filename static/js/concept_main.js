(function(concept){
    'use strict';

    var q = d3.queue()
		.defer(d3.json, "static/data/group_list_tweetID_subgroups_greater1.json");
    q.await(ready);

    function ready(error, allData){
	if (error){
	    return console.warn(error);
	}
	concept.makeFilterAndDimensions(allData);
	console.log(allData);
    }
}(window.concept = window.concept || {}));
