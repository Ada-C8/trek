$( document ).ready(function() {
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      response => {
        response.forEach(function(trip) {
          let tripInfo = `<li><p data-id=${trip.id}><strong>${trip.name}</strong> in ${trip.continent}</p></li>`
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
        <h4>${response.name} in ${response.continent}</h4>
        <p> This is a <strong>${response.weeks}</strong> week long trip</p>
        <p> category: ${response.category} </p>
        <p> cost: <strong>$${response.cost}</strong> </p>
        <p> description: ${response.about} </p>
        <p> trip id : ${response.id} </p>
        <p> <strong>RESERVE YOUR SPOT!</strong> </p>
        `;

        let form = `
          <form class="reserve" action="https://trektravel.herokuapp.com/trips/${response.id}/reservations" method="post">
            Name:<input type="text" name="name" placeholder="your full name"><br>
            Email:<input type="text" name="email" placeholder="your email"><br>
            <input type="submit" value="Submit">
          </form>`;

        $('#trip').html(tripInfo);
        $('#reserve').html(form);
      }) // end .get
      .fail(function(response){
          console.log(response);
          $('#fail').html('<p>Request was unsuccessful</p>')
        }) // end .fail
        .always(function(){
          console.log('always even if we have success or failure');
        });

      // post
      $('body').on('submit', 'form', function(e) {
        e.preventDefault();

        const url = $(this).attr('action'); // Retrieve the action from the form
        const formData = $(this).serialize();

      $.post(url, formData, (response) => {
        $('#message').html('<p> Your reservation has been saved! </p>');
        // What do we get in the response?
      }).fail(() => {
        $('#message').html('<p>Oh no, something went wrong</p>');
        console.log(response);
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  });
}; // end of loadTrip()

  // EVENTS
  $('ul').on('click', 'p', function(){
    const tripID = $(this).attr('data-id');
    loadTrip(tripID);
    $("button").click(function(){
        $('.trip-box').toggle();
    });
  });

  $('#load').on('click', function(){
    loadTrips();
  });


}); //end of document.ready
