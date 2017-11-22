// Wave 1 - Click a button/link to show all trips

$(document).ready( function() {

  const allTrips =

  seven_wonders.forEach((location) => {
    console.log(location);

    let address = location;

    $.get(`https://trektravel.herokuapp.com/trips`,
      (response) => {
        let locations = `
        <h2> ${response["results"][0]["formatted_address"]} </h2>
        <p> Latitude: ${(response["results"][0]["geometry"]["location"]["lat"])} </p>
        <p> Longitude: ${(response["results"][0]["geometry"]["location"]["lng"])} </p>`
        console.log(locations)
        console.log('success!');
        console.log(response["results"][0]["geometry"]["location"]);
        $('#locations').append(locations);
      });
    });
  });
















$(document).ready(function()
