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
          let tripInfo = `<li><h3 data-id=${trip.id}><a href="https://trektravel.herokuapp.com/trips/${trip.id}">${trip.name}</a></h3><p>${trip.continent}</p></li>`
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
  }; // end of loadTrip()


  // EVENTS
  $('ul').on('click', 'h3', function(){
    let tripID = $(this).attr('data-id');
    loadTrip(tripID);
  });

  $('#load').on('click', function(){
    loadTrips();
  });
}); //end of document.ready
