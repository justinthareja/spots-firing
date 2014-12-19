var MSW_API_KEY = "jx5HFZ5OyPH6zqKR9Pb8k230iSGymW2Q";
var MSW_API_SECRET = "48Kx1256b8VpNBHLKh5pA3Q77BN2asqy";
var mswSpot = '645';
var json;

$.ajax({
 
    url: 'http://magicseaweed.com/api/' + MSW_API_KEY + '/forecast/',
    data: {
        spot_id: mswSpot
    },
    type: "GET",
    dataType : "jsonp",

    success: function( response ) {
        json = response;
        console.log(response);
    },
 
    error: function( xhr, status, errorThrown ) {
        console.log( "Sorry, there was a problem!" );
    },
 
    complete: function( xhr, status ) {
        console.log("The request is complete");
    }
});






