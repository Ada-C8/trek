/* eslint-disable */
$(document).ready(() => {
  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      // console.log(response);
      $('#trips-body').html('');

      const tableHeaders = `
        <thead>
          <tr>
            <th width="100">ID</th>
            <th width="200">Name</th>
            <th width="200">Continent</th>
            <th width="200">Weeks</th>
            <th width="200">Trip Details</th>
          </tr>
        </thead>`;

      $('#trips-table').append(tableHeaders);

      response.forEach((trip) => {
        console.log(trip);
        // create html components to format each trip
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

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  const getTripDetails = function getTripDetails() {

  };

  // EVENTS
  $('#all-trips').on('click', function() {
    loadTrips();
  });

  $('#trip-details').on('click', function() {
    getTripDetails();
  });
});
