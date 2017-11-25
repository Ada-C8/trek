$( document ).ready(function() {
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      response => {
        response.forEach(function(trip) {
          let tripInfo = `<li><h3 data-id=${trip.id}>${trip.name}</h3><p>${trip.continent}</p></li>`
          $('ul').append(tripInfo);
        }); // end of forEach

      }) // end of $.get
      .fail(function(response){
          console.log(response);
          $('#fail').html('<p>Request was unsuccessful</p>')
        }) // end .fail
        .always(function(){
          console.log('always even if we have success or failure');
        });
  }; // end of loadTrips()

  const loadTrip = function loadTrip(id) {
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

        let reserveButton = `<button type="button" name="button">Reserve Spot</button>`

        let form = `
          <form class="reserve" action="https://trektravel.herokuapp.com/trips/id/reservations" method="post">Reserve a spot!
            <input type="text" name="name" value="your full name">
            <input type="text" name="age" value="your age">
            <input type="text" name="email" value="your email">
            <input type="submit" value="Submit">
          </form>`

        $('#trip').html(tripInfo);
        $('#reserve').html(reserveButton);
        $('#reserve').html(form);


      }) // end .get
      .fail(function(response){
          console.log(response);
          $('#fail').html('<p>Request was unsuccessful</p>')
        }) // end .fail
        .always(function(){
          console.log('always even if we have success or failure');
        });
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
