var map;
var styledMapType;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30, lng: 0},
    zoom: Math.ceil(Math.log2($(window).width())) - 8,
    minZoom: Math.ceil(Math.log2($(window).width())) - 8,
    maxZoom: 5,

    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });

  $.getJSON("js/mapstyle.json", function(data) {
    styledMapType = new google.maps.StyledMapType(data);
    styleMap();
  });

  translate();

  highlightMap();

  createWindow();
}

function styleMap() {
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
}

function translate() {
  $.get("https://crossorigin.me/https://rede-182207.appspot.com?lang=en&text=Hello", function(data) {
    console.log(data);
  });
}

function highlightMap() {
  var world_geometry = new google.maps.FusionTablesLayer({
    query: {
      select: 'geometry',
      from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
      where: "ISO_2DIGIT IN ('RU', 'KZ', 'KG')"
    },
    styles: [{
      polygonOptions: {
        fillColor: '#00ff00',
        fillOpacity: 0.25
      }
    }],
    map: map,
    suppressInfoWindows: true
  });
}

function createWindow() {
  var contentString = 'Здравствуйте';

  var infoWindow = new google.maps.InfoWindow({
    content: contentString,
    position: {lat: 61.495, lng: 104.98315}
  });

  infoWindow.open(map);
}
