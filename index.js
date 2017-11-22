$( document ).ready(function() {
  loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      response => {
        console.log('success!');
        console.log(response);
        // for (let i = 0; i < response.length; i++) {
        //   // TODO: add link to li items
        //   $('ul').append(`<li><h3>${response[i]["name"]}</h3></li> continent : ${response[i]["continent"]}`)
        // } // end of for loop

        response.forEach(function(trip) {
          let tripInfo = `<li><h3>${trip.id}> ${trip.name} </a></h3><p> ${pet.continent}</li>`
          $('ul').append(tripInfo);
        }); // end of forEach

      }) // end of $.get
  }; // end of loadTrips()




  loadTrip = function loadTrip(id) {
    $.get('https://trektravel.herokuapp.com/trips/id',
      response => {
        console.log('success!');
        console.log(response);
      })
  };
}); //end of document.ready
