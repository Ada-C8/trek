$(document).ready(() => {

  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach(function(trip) {
          const tripsInfo = `<li><p>${trip.name}</p></li>`
          $('#trips ol').append(tripsInfo);
        });
      });
  };

  // const loadTrip = function loadTrip(id) {
  //   $.get(`https://trektravel.herokuapp.com/trips/${id}`,
  // }

  $('#load').on('click', function() {
    loadTrips();
    $('h3').text('Select a Trip');
    $('#trips ol').empty();
  });
}); // end of doc ready
