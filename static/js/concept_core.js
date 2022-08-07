(function(concept){
    'use strict';

    concept.data = {};
    concept.activeType = null;
    concept.getDataFromAPI = function(resource, callback){
	d3.json($EVE_API + resource, function(error, data){
	    if (error){
		return callback(error);
	    }
	    if ('_items' in data){
		callback(null, data._items);
	    }
	    else{
		callback(null, data);
	    }
	});
    };

    concept.makeFilterAndDimensions = function(data){
		console.log(data);
		concept.filter = crossfilter(data.nodes);
		concept.typeDim = concept.filter.dimension(function(o){ return o.type; });
    };
    
    concept.filterByType = function(){
		concept.typeDim.filter(1);
    };

    concept.filterByDay = function(){
		concept.dayDim.filter(l);
    };


    concept.onDataChange = function(){
		concept.updateList(concept.typeDim.top(Infinity));

    };

}(window.concept = window.concept || {}));
