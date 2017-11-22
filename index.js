/* eslint-disable */
$(document).ready(() => {

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      // console.log(response);
      $('#trips-body').html('');
      response.forEach((trip) => {
        console.log(trip);
        // create html components to format each trip
        //const tripInfo = `Trip: ${trip.id} Name: ${trip.name}`;
        const tableBody = `
          <tr>
            <td>${trip.id}</td>
            <td>${trip.name}</td>
            <td>${trip.continent}</td>
            <td>${trip.weeks}</td>
            <td><button id="trip-details"><em>View Trip</em></button></td>
          </tr>`

        //$('#featured-content').append(tripInfo);
        $('#trips-body').append(tableBody);

      });

    }).fail(() => {
      console.log('Did not load successfully!');
    });
  };

  // EVENTS
  $('#all-trips').on('click', function() {
    loadTrips();
  });


});
