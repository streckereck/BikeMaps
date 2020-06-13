// Define tile layers
var MapQuestOpen_OSM = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
      attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: '1234'
    }),
    OpenStreetMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 13,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }),
    OpenCycleMap = L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=5bd949eef5d64b8fa02f3fa0d7634b64', {
      minZoom: 14,
      maxZoom: 18,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }),
    Esri_Streets_Basemap = L.esri.basemapLayer("Streets"),
    Mapnik_BW = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
      attribution: '<a href="https://openstreetmap.org/">&copy OpenStreetMap contributors, CC-BY-SA</a>',
      subdomains: '1234'
    }),
    stravaHM = L.tileLayer('https://heatmap-external-{s}.strava.com/tiles/ride/gray/{z}/{x}/{y}.png', {
      minZoom: 3,
      maxZoom: 13,
      maxNativeZoom: 11,
      opacity: 0.8,
      attribution: '<a href=http://labs.strava.com/heatmap/>http://labs.strava.com/heatmap/</a>'
    }),
    infrastructure = L.esri.dynamicMapLayer({
        url: 'https://grs.asurite.ad.asu.edu/server/rest/services/Bikemaps/InfrastructureARCFGDB_Cache/MapServer',
        opacity: 0.7
    });

var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data � <a href="https://openstreetmap.org">OpenStreetMap</a>';
var osm = new L.TileLayer(osmUrl);