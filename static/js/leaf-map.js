var map =new L.map('leaf-map').setView([41.3228, -93.7181], 4);   //USA

//open street map 
 var tile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
     maxZoom: 18,}).addTo(map);

var markers = L.markerClusterGroup();

L.svg().addTo(map);


function refresh() {
    map.setView([41.3228, -93.7181], 4); 
}

function drowmap() {
	refresh();
    click_data = d3.select(this).node().__data__;
	
    //console.log(click_data);
    
    d3.select("#leaflet-zoom-hide").remove();

    var svgLayer = d3.select(map.getPanes().overlayPane).append('svg').attr('class', 'leaflet-zoom-hide');
    var plotLayer = svgLayer.append('g');
	
	
    var reset = function () {
        var bounds = map.getBounds();
        var topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
        var bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

        svgLayer.attr("width", bottomRight.x - topLeft.x)
                .attr("height", bottomRight.y - topLeft.y)
                .style("left", topLeft.x + "px")
                .style("top", topLeft.y + "px");

        plotLayer.attr('transform', 'translate(' + -topLeft.x + ',' + -topLeft.y + ')');
    }

    var updatePosition = function (d) {
        d.pos = map.latLngToLayerPoint(new L.LatLng(d.y, d.x));
        d3.select(this).attr('cx', function(d){return d.pos.x;});
        d3.select(this).attr('cy', function(d){return d.pos.y;});
    }
	

    d3.csv("static/data/plot_pois_day15.csv", function (error, cities) {	


		var group_info = click_data.group;
//		console.log(group_info)

        var filtered = []
		cities.filter(function (item, index) {
			group_info.forEach(function(lw){
				if (item.localword == lw) filtered.push(item);
			})
        });
		
		filtered.forEach(function(d){
			d.pos = map.latLngToLayerPoint(new L.LatLng(d.y, d.x));
		})
		
		for(i=0; i<filtered.length; i++){		
			var a = filtered[i];
			var title = filtered[i].localword.split("_")[0];
			var marker = L.marker( [a.x, a.y], {title: title});
			marker.bindPopup(title);
			markers.addLayer(marker)
		}
		map.addLayer(markers);

        reset();
    });
	markers.clearLayers();

}

