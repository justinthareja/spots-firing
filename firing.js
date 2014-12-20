var MSW_API_KEY = "jx5HFZ5OyPH6zqKR9Pb8k230iSGymW2Q";
var MSW_API_SECRET = "48Kx1256b8VpNBHLKh5pA3Q77BN2asqy";

function getSpot () {
  var spots = Object.keys(spotNumber);
  var randomIndex = Math.floor(Math.random () * spots.length);

  while (spotNumber[spots[randomIndex]]) {
    randomIndex = Math.floor(Math.random () * spots.length);
  }
  spotNumber[spots[randomIndex]] = true;
  console.log('calling MSW for spot number', spots[randomIndex]);
  return spots[randomIndex];
}

function callMSW () {
  $.ajax({
   
    url: 'http://magicseaweed.com/api/' + MSW_API_KEY + '/forecast/',
    data: {
      spot_id: getSpot(),
      fields: 'timestamp, solidRating'
    },
    type: "GET",
    dataType : "jsonp",

    success: function( response ) {
      getCurrentSwell(response, checkSwellRating);
    },
 
    error: function( xhr, status, errorThrown ) {
      console.log( "Sorry, there was a problem!" );
    },
 
    complete: function( xhr, status ) {
      console.log("The request completed is complete!");
    }
  });
}

function getCurrentSwell (array, callback) {
    
  var now = Date.now() / 1000;
  var today = array.slice(0, 8); 

  var currentForecast = today.reduce(function (current, forecast) {
    return Math.abs(current.timestamp - now) < Math.abs(forecast.timestamp - now) ? current : forecast;
  })

  callback(currentForecast);

}

function checkSwellRating (forecast) {

  if (forecast.solidRating === 5) {
    console.log('Found a spot thats FIRING', forecast);
    // call for all the data
  }
  else {
    console.log('Forecast was less than five stars', forecast.solidRating);
    callMSW();
  }

}

callMSW();

// declare a var "swellNow" 
// iterate over the json response
// at each iteration subtract the timestamp from the time complete
// take the absolute value
// if the absolute value is less than the current swellNow, reset swellNow to the timestamp of that element
// at the end of the foreach loop, swellNow should be the json element that is the closest to right now




