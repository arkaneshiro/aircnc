function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function initMap() {
  // const lat = parseInt(getCookie("lat"));
  // const lng = parseInt(getCookie("lng"));
  const lat = 37.4213117;
  const lng = -122.0839677;
  const map = new google.maps.Map(
    document.getElementById('map'), {
    zoom: 12,
    center: { lat, lng }
  });

  new google.maps.Marker({
    position: { lat, lng },
    map,
    label: "$100"
  });
  // const geocoder = new google.maps.Geocoder;
  // const infowindow = new google.maps.InfoWindow;

  // document.getElementById('submit')
  //   .addEventListener('click', () => {
  //     geocodeAddress(geocoder, map, infowindow);
  //   });
}

// function geocodeAddress(geocoder, resultsMap) {
//   const address = document.getElementById('address').nodeValue;
//   geocoder.geocode({ 'address': address }, (results, status) => {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       const marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// };

// module.exports = {
//   initMap
// }