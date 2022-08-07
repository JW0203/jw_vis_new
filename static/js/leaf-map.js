var map =new L.map('leaf-map').setView([41.3228, -93.7181], 4);   //USA
//var map =new L.map('leaf-map').setView([41.660119, -88.441295], 7.5); // Chicago

//   //open street map 純正
 var tile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
     maxZoom: 18,

 }).addTo(map);
var markers = new Array();

L.svg().addTo(map);

var IconColor = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', // https://github.com/pointhi/leaflet-color-markers
  //shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [10, 16],
  iconAnchor: [5, 16],
  popupAnchor: [1, -30],
  //shadowSize: [10, 10]
});

function refresh() {
    //map.setView([41.660119, -88.441295], 7.5);
    map.setView([41.3228, -93.7181], 4); 
}

function drowmap() {
	refresh();
    click_data = d3.select(this).node().__data__;
	
    console.log(click_data);
    
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
	
	if (markers.length > 0){
		console.log(markers)
		for(i=0;i<markers.length;i++) {
			map.removeLayer(markers[i]);
		}
		markers.length = 0
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
		
		for(i=0;i<filtered.length;i++){
			var loc = L.marker([filtered[i].x, filtered[i].y], {icon: IconColor}).bindTooltip(filtered[i].localword, { permanent: true, interactive: true }).addTo(map);
			markers.push(loc);
			map.addLayer(markers[i]);
		}

		if (markers){
			console.log(markers.length) 
		}
        
        reset();
    });

}

