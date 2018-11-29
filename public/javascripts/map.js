'use strict';

const id = document.getElementById('order-id').value;

const main = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmNvZGVyOTIiLCJhIjoiY2pkbmRmdno4MGQ2ODJ4bWtxcG02dnk1ciJ9.DehQETKEOyrOha4hqclYvg';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [41.3948976, 2.0787281].reverse(),
    zoom: 12
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var pos = [position.coords.longitude, position.coords.latitude];
      map.setCenter(pos);
    }, () => {
      alert('Issue retrieving your location');
    });
  } else {
    alert(' Your browser doesn\'t support Geolocation');
  }

  axios.get(`https://foodeezapp.herokuapp.com/order/${id}/restaurants`)
    .then((result) => {
      result.data.forEach(restaurant => {
        let lat = restaurant.location.coordinates[0];
        let lng = restaurant.location.coordinates[1];
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map);
      });
    })
    .catch(err => console.error(err));
};

window.addEventListener('load', main);

/* //map.js:35 Error: `LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]
at Function.yu.convert (lng_lat.js:121)
at o.setLngLat (marker.js:251)
at result.data.forEach.restaurant (map.js:31)
at Array.forEach (<anonymous>)
at axios.get.then (map.js:29) */
