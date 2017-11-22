$( document ).ready(function() {
  loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      response => {
        console.log('success!');
        console.log(response);
        // for (let i = 0; i < response.length; i++) {
        //   $('ul').append(`<li><h3>${response[i]["name"]}</h3></li> continent : ${response[i]["continent"]}`)
        // } // end of for loop

        response.forEach(function(trip) {
          let tripInfo = `<li><h3 data-id=${trip.id}>${trip.name}</h3><p>${trip.continent}</p></li>`
          $('ul').append(tripInfo);
        }); // end of forEach

      }) // end of $.get
  }; // end of loadTrips()


  loadTrip = function loadTrip(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      response => {
        let tripInfo = `
        <h2> ${response.name} </h2>
        <p> id: ${response.id} </p>
        <p> continent: ${response.continent} </p>
        <p> about: ${response.about} </p>
        <p> category: ${response.category} </p>
        <p> weeks: ${response.weeks} </p>
        <p> cost: ${response.cost} </p>`;

        $('#trip').html(tripInfo);


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
