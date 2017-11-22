$(document).ready(() => {

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      response.forEach((trip) => {
        const tripID = `Trip: ${trip.id}`;
        const tripName = `Name: ${trip.name}`
        console.log(trip)
        $('#featured-content').append((tripID + tripName));
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
