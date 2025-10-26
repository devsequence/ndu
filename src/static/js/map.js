


let map;
let infowindow;
let lastMarker = null;

function initMap() {
  const mapIcon = $('.mapPin').val() || ''; // fallback
  const zoomMap = Number($('.zoom').val()) || 14;

  const firstCoords = ($('.nav a').first().data('map') || '').split(',');
  const initialLat = parseFloat(firstCoords[0]?.trim()) || 0;
  const initialLng = parseFloat(firstCoords[1]?.trim()) || 0;
  const myLatLng = { lat: initialLat, lng: initialLng };
  const mapStyles =  [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#bc6000"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "labels.text",
          "stylers": [
              {
                  "color": "#bc6000"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#bc6000"
              }
          ]
      },
      {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.place_of_worship",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },


      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#65bfe4"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#d7bea4"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#8e8e8e"
              }
          ]
      }

  ];
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoomMap,
    center: myLatLng,
    disableDefaultUI: true,
    styles: mapStyles 
  });

  

  // Додаємо перший маркер
  const $firstItem = $('.nav-contact li').first();
  if ($firstItem.length) {

    lastMarker = addMarker(initialLat, initialLng, mapIcon);
  }

  $('.nav-contact li').each(function () {
    const coords = ($(this).data('map') || '').split(',');
    const mapLat = parseFloat(coords[0]?.trim());
    const mapLng = parseFloat(coords[1]?.trim());

    if (isNaN(mapLat) || isNaN(mapLng)) return;


    // Видаляємо попередній маркер
    if (lastMarker) {
      lastMarker.setMap(null);
    }

    lastMarker = addMarker(mapLat, mapLng, mapIcon);
    map.setCenter({ lat: mapLat, lng: mapLng });
    map.setZoom(zoomMap);
  });
}

function addMarker(lat, lng, icon) {
  return new google.maps.Marker({
    position: { lat, lng },
    map: map,
    icon: icon || null,
  });
}
