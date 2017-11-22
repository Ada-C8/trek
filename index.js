$(document).ready(() => {

  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach(function(trip) {
          const tripInfo = `<li><h3> Travel to ${trip.name}</h3></li>`
          $('#trips ol').append(tripInfo);
        });
      });
  };

  $('#load').on('click', function() {
    loadTrips();
    $('#trips ol').empty();
  });
}); // end of doc ready
