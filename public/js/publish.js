var longlats =
[[5.274808, 10.453213], //Longitude, latitude
[12.240905, 10.682174], //Longitude, latitude
[12.115775, 12.485605], //Longitude, latitude
[6.772220, 12.608866]];
const socket = io({ transports: ['websocket'] });
var count = 1;
console.log("I am here")
setInterval(function() {
  console.log(count);
  if(count==longlats.length-1){
      count = 0;
  }
    var item = {};
    item.Coordinate = {};
    item.Coordinate.Longitude = longlats[count][0];
    item.Coordinate.Latitude = longlats[count][1];
    count++;
    socket.emit('lastKnownLocation', item);
  
}, 5000);