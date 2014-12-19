var MSW_API_KEY = "jx5HFZ5OyPH6zqKR9Pb8k230iSGymW2Q";
var MSW_API_SECRET = "48Kx1256b8VpNBHLKh5pA3Q77BN2asqy";
var mswSpot = '644';

// query random spot from spotNumber who's value is still false
// filter the query to only the timestamp closest to now

$.ajax({
 
    url: 'http://magicseaweed.com/api/' + MSW_API_KEY + '/forecast/',
    data: {
        spot_id: mswSpot,
        // fields: 'timestamp, solidRating, fadedRating, localTimestamp'
    },
    type: "GET",
    dataType : "jsonp",

    success: function( response ) {
        currentSwell(response, function (currentForecast) {
          console.log(currentForecast);
        })
    },
 
    error: function( xhr, status, errorThrown ) {
        console.log( "Sorry, there was a problem!" );
    },
 
    complete: function( xhr, status ) {
        console.log("The request completed is complete!");
    }
});



function currentSwell (array, callback) {
    
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
  }
  else {
    // re-call magicseaweed 
  }


}

// declare a var "swellNow" 
// iterate over the json response
// at each iteration subtract the timestamp from the time complete
// take the absolute value
// if the absolute value is less than the current swellNow, reset swellNow to the timestamp of that element
// at the end of the foreach loop, swellNow should be the json element that is the closest to right now




