(function(concept){
    'use strict';

    d3.select('#type-select select')
	.on('change', function(d){
        var type = d3.select(this).property('value');
 
	//console.log(type);
	   concept.typeDim.filter(type);
        concept.onDataChange();
	});

    
}(window.concept = window.concept || {}));
