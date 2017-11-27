/* eslint-disable */
$(document).ready(() => {
  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  const loadTrips = function loadTrips() {
    $('#single-trip-info').hide();

    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      // console.log(response);

      // Create Table Header and append each trip to body
      const tableHeaders = `
          <tr>
            <th width="100">ID</th>
            <th width="200">Name</th>
            <th width="200">Continent</th>
            <th width="200">Weeks</th>
            <th width="200">Trip Details</th>
          </tr>`;

      $('#trips-head').html(tableHeaders);

      $('#trips-body').html('');

      response.forEach((trip) => {
        console.log(trip);
        const tableBody = `
          <tr>
            <td>${trip.id}</td>
            <td>${trip.name}</td>
            <td>${trip.continent}</td>
            <td>${trip.weeks}</td>
            <td><button id="trip-details" data-id="${trip.id}"><em>View Trip</em></button></td>
          </tr>`;

        $('#trips-body').append(tableBody);
      });
    }).fail(() => {
      console.log('Did not load successfully!');
      $('#featured-content').html('<em>An error has occurred. All trips could not be loaded.</em>');
    });
  };


  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR TRIP DETAILS
  const getTripDetails = function getTripDetails(id) {
    // Clear existing table
    $('#trips-head').html('');
    $('#trips-body').html('');
    $('#single-trip-info').show();

    const singleTripURL = `https://trektravel.herokuapp.com/trips/${id}`;

    $.get(singleTripURL, (response) => {
      console.log(response);
      const singleTripTable = `
      <h3 class="trip-details-title">Trip Details</h3>
      <p class="trip-details-title"><em>(Scroll left or right to view trip details table)</em><p>

      <article class="trip-details-info column small-4 small-centered row">

        <table data-tooltip data-options="hover_delay: 50;" title="Scroll left or right!" class="trip-info-table scroll centered has-tip">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Continent</th>
              <th>Category</th>
              <th>Weeks</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${response.id}</td>
              <td>${response.name}</td>
              <td>${response.continent}</td>
              <td>${response.category}</td>
              <td>${response.weeks}</td>
              <td>${response.cost}</td>
            </tr>
          </tbody>
        </table>

      </article>
      <article class="trip-details-about column small-8 small-centered row">
        <h4>Description</h4><p class="trip-about-text">${response.about}</p>
      </article>

      <div class="column small-8 small-centered row">
        <button id="reserve-trip" class="button expanded"><strong>Make a Reservation</strong></button>

        <section id="reservation-modal">
          <form id="reservation" data-id="${response.id}">

            <label for="name">Name:</label>
            <input type="text" name="name" placeholder="Firstname Lastname" required="required"></input>

            <label for="age">Age:</label>
            <input type="number" name="age" required="required"></input>

            <label for="email">Email:</label>
            <input type="text" name="email" required="required"></input>

            <button class="button expanded" type="submit"><strong>Reserve Trip Now</strong></button>
          </form>
        </section>
      </div>
      `;

      $('#single-trip-info').html(singleTripTable);
      $('#reservation-modal').hide();

    }).fail(() => {
      console.log('Did not load successfully!');
      $('#featured-content').html('<p><em>An error has occurred. The trip details could not be loaded.</em></p>');
    });
  };

  // FUNCTION FOR AJAX REQUEST AND RESPONSE TO RESERVE TRIP
  const makeTripReservation = function makeTripReservation(id) {

    const tripID = id;
    const tripReservationsURL = `https://trektravel.herokuapp.com/trips/${tripID}/reservations`
    console.log(tripReservationsURL);

    const successCallback = function(response) {
      console.log('POST request was successful');
      console.log(response);
      $('#reservation-modal').html('Your trips has successfully been reserved!');
    };

    const failCallback = function(response) {
      console.log('An error occurred: Post was unsuccessful');
      console.log(response);
      $('#reservation-modal').html('Error: Your trip could not be reserved. Please refresh your browser and try again.');
    };

    let formData = $('#reservation').serialize();
    console.log(formData);

    $.post(tripReservationsURL, formData, successCallback).fail(failCallback);
  };

  // FOUNDATION
  $(document).foundation();

  // EVENTS
  // To view All Trips
  $('#all-trips').on('click', function() {
    loadTrips();
  });

  // To View Trip Details
  $('#featured-content').on('click', '#trip-details', function() {
    //console.log('Button trip details clicked');
    let tripID = $(this).attr('data-id');
    getTripDetails(tripID);
  });

  // To Reserve Trip
  $('#single-trip-info').on('submit', '#reservation', function(response) {
    console.log('Button reserve trip clicked');
    event.preventDefault();
    let tripID = $(this).attr('data-id');
    makeTripReservation(tripID);
  });

  // To Show Trip Reservation Form
  $('#single-trip-info').on('click', '#reserve-trip', function() {
    $('#reservation-modal').show();
  });

  $(document).foundation('tooltip', 'reflow');

  // Media Queries
  // $(window).resize(function(){
  // 	if ($(window).width() <= 700){
  //     // To View Trip Details
  //     const tripDetailsList = `
  //     <h3 class="trip-details-title">Trip Details</h3>
  //     <article class="trip-details-info column small-8 small-centered row">
  //       <h5>ID: ${response.id}</h5>
  //       <h5>Name: ${response.name}</h5>
  //       <h5>Continent: ${response.continent}</h5>
  //       <h5>Category: ${response.category}</h5>
  //       <h5>Weeks: ${response.weeks}</th>
  //       <h5>Cost: ${response.cost}</th>
  //     </article>
  //     `
  //     $('#trip-details-info').html(tripDetailsList);
  // 	}
  // });

});
