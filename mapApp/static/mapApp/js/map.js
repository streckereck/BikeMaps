// Leaflet map code and functions

/* GLOBAL VARIABLES */

// Global map object
var map;

// Dynamically clustered point data layer
var accidentPoints = new L.MarkerClusterGroup({maxClusterRadius: 50})  //, disableClusteringAtZoom: 16});

// Heatmap layer corresponding to all accident data
var heatMap = L.heatLayer([], {radius: 50, blur:20, opacity: 1});

// Custom icons (Using Maki icon symbols)
var bikeRedIcon = L.MakiMarkers.icon({icon: "bicycle", color:"#d9534f", size: "m"});
var bikeYellowIcon = L.MakiMarkers.icon({icon: "bicycle", color:"#f0ad4e", size: "m"});
var policeIcon = L.MakiMarkers.icon({icon: "police", color:"#428bca", size: "m"});

/* Create the map with a tile layer and set global variable map */
function initialize(){
/* BASEMAPS */
	var openCycleMap = L.tileLayer(
	    'http://tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
	    attribution: '&copy <a href=http://openstreetmap.org>OpenStreetMap</a> contributors, CC-BY-SA',
	    maxZoom: 18,
	    });
	
	var mapbox = L.tileLayer('http://{s}.tiles.mapbox.com/v3/tayden.ibi2aoib/{z}/{x}/{y}.png', {
	    attribution: 'Tiles courtesy of <a href=https://www.mapbox.com/>Mapbox</a>, \
	    	map data &copy <a href=http://openstreetmap.org>OpenStreetMap</a> contributors',
	    maxZoom: 18
	});

    var humanitarianOSM = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	    attribution: '&copy <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, tiles courtesy of <a href=http://hot.openstreetmap.org/>Humanitarian OpenStreetMap Team</a>',
	    maxZoom: 20
	});

    var mapboxSat = L.tileLayer('http://{s}.tiles.mapbox.com/v3/openstreetmap.map-4wvf9l0l/{z}/{x}/{y}.png', {
    	attribution: 'Tiles courtesy of <a href=https://www.mapbox.com/>Mapbox</a>, \
	    	map data &copy <a href=http://openstreetmap.org>OpenStreetMap</a> contributors',
	    maxZoom: 18
	});

    var mapQuest = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
	    attribution: 'Tiles courtesy of <a href=https://open.mapquest.com/>MapQuest</a>, \
	    	map data &copy <a href=http://openstreetmap.org>OpenStreetMap</a> contributors',
	    maxZoom: 18,
	    subdomains: '1234' // Switch between subdomains {s} 1,2,3,4 instead of a,b,c
	});


	var osmMapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: '&copy <a href=https://openstreetmap.org/>OpenStreetMap</a> contributors, CC-BY-SA',
	    maxZoom: 19,
	});


	var osmMapnikBW = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
	    attribution: '&copy <a href=https://openstreetmap.org/>OpenStreetMap</a> contributors, CC-BY-SA',
	    maxZoom: 18,
	});


	/* Define which map tiles are basemaps */
	var baseMaps = {
		// "Open Street Map": osmMapnik,
		// "Open Street Map B&W": osmMapnikBW,
		// "Humanitarian OSM": humanitarianOSM,
		"Map": mapbox,
		"Open Cycle Map": openCycleMap,
		"Satellite": mapboxSat,
		// "MapQuest OSM": mapQuest,
	};



/* OVERLAY MAPS */
	/* OSM Strava heatmap tile layer */
	var stravaHM5 = L.tileLayer('http://gometry.strava.com/tiles/cycling/color5/{z}/{x}/{y}.png', {
	    attribution: 'ridership data &copy <a href=http://labs.strava.com/heatmap/>Strava labs</a>',
	    minZoom: 3,
	    maxZoom: 17,
	    opacity: 0.5
	});


	/* Define which map tiles are overlays */
	var overlayMaps = {
		"Accident heat map": heatMap,
		"Accident points": accidentPoints,
		"Ridership heat map": stravaHM5,
	}

/* DEFAULTS AND PANEL */	
	/* Set map center, zoom, default layers and render */
	map = L.map('map', {
		center: [48.5, -123.3],
		zoom: 11,
		layers: [mapbox, accidentPoints, stravaHM5] /* Layers to display on load */
	});
	
	/* Create the control panel */
	L.control.layers(baseMaps, overlayMaps).addTo(map);

}




/* Create a popup when map is clicked with button to add a new point  */
function mapClickPrompt(e) {
	var popup = L.popup({'closeOnClick': true, });
    popup
        .setLatLng(e.latlng)
        .setContent('<button class="btn btn-primary btn-lg" data-toggle="modal" \
        	data-target="#incidentForm"><span class="glyphicon glyphicon-pushpin"></span></button>')
        .openOn(map);

    //Set point field in form to click location
    document.getElementById("point").value = ('Point('+e.latlng.lng+' '+e.latlng.lat+')');
}


function addPoint(latlng, msg, type) {
    heatMap.addLatLng(latlng);

    var icon;
    if (type == "police") {
    	icon = policeIcon;
    }
    else if (type == "Collision") {
    	icon = bikeRedIcon;
    }
    else {
    	icon = bikeYellowIcon;
    }
	marker = L.marker(latlng, {icon: icon});
    marker.bindPopup(msg);
    
    accidentPoints.addLayer(marker);
}

function toggleICBC() {
	return
}

function toggleBikeRacks() {
	return
}

function locateUser() {
    this.map.locate({setView : true});
}