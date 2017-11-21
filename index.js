
const getTrips = function getTrips() {
  $.get('https://trektravel.herokuapp.com/trips', (response) => {
    console.log(response);
    response.forEach((trip) => {
      const tripName = `<li>${trip.name}</li>`;
      $('#tripList').append(tripName);
    });
  })
  .fail(() => {
    console.log('failure');
  })
  .always(() => {
    console.log('always even if we have success or failure');
  });
}; // end of getTrips function


$(document).ready(() => {

  $('#button').on('click', () => {
    getTrips();
  });

});

// EVENTS
