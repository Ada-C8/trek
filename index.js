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
      <h3>Trip Details</h3>
      <table id="atrip-table" class="responsive scroll">
        <thead id="atrip-head">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Continent</th>
            <th>About</th>
            <th>Category</th>
            <th>Weeks</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody id="atrip-body">
          <tr class="atrip-row">
            <td class="atrip-cell">${response.id}</td>
            <td class="atrip-cell">${response.name}</td>
            <td class="atrip-cell">${response.continent}</td>
            <td class="atrip-cell">${response.about}</td>
            <td class="atrip-cell">${response.category}</td>
            <td class="atrip-cell">${response.weeks}</td>
            <td class="atrip-cell">${response.cost}</td>
          </tr>
        </tbody>
      </table>

      <a id="reserve-trip" class="button expanded"><strong>Reserve Trip</strong></a>

      <section id="reservation-modal">
        <form id="reservation" data-id="${response.id}">

          <label for="name">Name:</label>
          <input type="text" name="name" required="required"></input>

          <label for="age">Age:</label>
          <input type="number" name="age" required="required"></input>

          <label for="email">Email:</label>
          <input type="text" name="email" required="required"></input>

          <button class="button" type="submit">Reserve Trip</button>

        </form>
      </section>
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
  $('#all-trips').on('click', function() {
    loadTrips();
  });

  $('#featured-content').on('click', '#trip-details', function() {
    //console.log('Button trip details clicked');
    let tripID = $(this).attr('data-id');
    getTripDetails(tripID);
  });

  $('#single-trip-info').on('submit', '#reservation', function(response) {
    console.log('Button reserve trip clicked');
    event.preventDefault();
    let tripID = $(this).attr('data-id');
    makeTripReservation(tripID);
  });

  $('#single-trip-info').on('click', '#reserve-trip', function() {
    $('#reservation-modal').show();
  });

});
