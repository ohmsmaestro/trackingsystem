//Base Layer with Open Street Maps
const socket = io({ transports: ['websocket'] });
socket.on('locationUpdate', function (data) {
  console.log("I received it");
  var location = data;
  console.log('Errrrrrrrrr:::::: ', JSON.parse(location));
  updateCoordinate(JSON.parse(location));
});

var baseMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});
//Construct the Map Object
var map = new ol.Map({
  target: 'map',
  layers: [ baseMapLayer],
  view: new ol.View({
          center: ol.proj.fromLonLat([5.274808, 10.453213]),
          zoom: 15 //Initial Zoom Level
        })
});
//Set up an  Style for the marker note the image used for marker
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */ ({
      anchor: [0.5, 16],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://img.icons8.com/ios/100/000000/ip-address.png'
    }))
});
//Adding a marker on the map
var marker = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([5.274808, 10.453213])
  )
});
marker.setStyle(iconStyle);
var vectorSource = new ol.source.Vector({
  features: [marker]
});
var markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
});
// add style to Vector layer style map
map.addLayer(markerVectorLayer);

function updateCoordinate(item) { 
  let value = JSON.parse(item);

  console.log('I dey here og:::::', value)
  // Structure of the input Item
  // {"Coordinate":{"Longitude":80.2244,"Latitude":12.97784}}    
  var featureToUpdate = marker;

  var coord = ol.proj.fromLonLat([value.Coordinate.Longitude, value.Coordinate.Latitude]);
  featureToUpdate.getGeometry().setCoordinates(coord);
}

// var longlats =
// [[5.274808, 10.453213], //Longitude, latitude
// [12.240905, 10.682174], //Longitude, latitude
// [12.115775, 12.485605], //Longitude, latitude
// [6.772220, 12.608866]];
// var count = 1;
// var item = {};
// item.id = marker.getId;
// item.Coordinate = {};

// console.log(longlats);
// setInterval(function() {
//   if(count==longlats.length-1){
//     count = 1;
//   }
//   item.Coordinate.Longitude = longlats[count][0];
//   item.Coordinate.Latitude = longlats[count][1];
//   count++;

//   updateCoordinate(item);
// }, 5000);

// io.on('connection', function (socket) {
//   console.log('socket created!!!!!');
//   let previousId;
//   const safeJoin = currentId => {
//       socket.leave(previousId);
//       socket.join(currentId);
//       previousId = currentId;
//     };
//   socket.on('disconnect', function() {
//     console.log('Got disconnect!');
//  });
//  socket.on('lastKnownLocation', function (data) {
//           var location = JSON.stringify(data);
//          redisPublisher.publish('locationUpdate', location);
//    });
// });

