/* eslint-disable */
$(document).ready(() => {
  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  const loadTrips = function loadTrips() {
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

    const singleTripURL = `https://trektravel.herokuapp.com/trips/${id}`;

    $.get(singleTripURL, (response) => {
      console.log(response);
      const singleTripTable = `
      <h3>Trip Details</h3>
      <table id="atrip-table">
        <thead id="atrip-head">
          <tr>
            <th width="100">ID</th>
            <th width="200">Name</th>
            <th width="150">Continent</th>
            <th width="800">About</th>
            <th width="150">Category</th>
            <th width="100">Weeks</th>
            <th width="100">Cost</th>
            <th width="100">Reserve</th>
          </tr>
        </thead>
        <tbody id="atrip-body">
          <tr>
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
      `;

      $('#single-trip-info').html(singleTripTable);

    }).fail(() => {
      console.log('Did not load successfully!');
      $('#featured-content').html('<p><em>An error has occurred. The trip details could not be loaded.</em></p>');
    });
  };

  // EVENTS
  $('#all-trips').on('click', function() {
    loadTrips();
  });

  $('#featured-content').on('click', '#trip-details', function() {
    //console.log('Button trip details clicked');
    let tripID = $(this).attr('data-id');
    getTripDetails(tripID);
  });
});
