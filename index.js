// /* eslint-disable */
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
            <td><button id="trip-details"><em>View Trip</em></button></td>
          </tr>`;

        $('#trips-body').append(tableBody);
      });
    }).fail(() => {
      console.log('Did not load successfully!');
      $('#featured-content').html('<em>An error has occurred. All trips could not be loaded.</em>');
    });
  };

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR TRIP DETAILS
  const getTripDetails = function getTripDetails() {
    $('#trips-head').html('');
    $('#trips-body').html('');

    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      // console.log(response);
      // response.forEach((trip) => {
      // });
    }).fail(() => {
      console.log('Did not load successfully!');
      $('#featured-content').html('<em>An error has occurred. The trip details could not be loaded.</em>');
    });
  };

  // EVENTS
  $('#all-trips').on('click', function() {
    loadTrips();
  });

  $('#featured-content').on('click', '#trip-details', function() {
    //console.log('Button trip details clicked');
    getTripDetails();
  });
});
