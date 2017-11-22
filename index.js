$(document).ready(() => {

  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach(function(trip) {
          const tripInfo = `<li><p>${trip.name}</p></li>`
          $('#trips ol').append(tripInfo);
        });
      });
  };

  $('#load').on('click', function() {
    loadTrips();
    $('h3').text("Select a Trip");
    $('#trips ol').empty();
  });
}); // end of doc ready
