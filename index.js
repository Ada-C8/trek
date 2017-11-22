$(document).ready(() => {

  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach(function(trip) {
          const tripsInfo = `<li><p>${trip.name}</p></li>`
          $('#trips ol').append(tripsInfo);
        });
    }).fail(() => {
      $('#fail').html('<p>Request was unsuccessful</p>');
    }).always(() => {
      console.log('always message here');
    });

  }; // end of loadTrips

  // const loadTrip = function loadTrip(id) {
  //   $.get(`https://trektravel.herokuapp.com/trips/${id}`,
  //     (response) => {
  //       let tripInfo =
  //       <
  //     });
  // }; // end of loadTrips

  $('#load').on('click', function() {
    loadTrips();
    $('h3').text('Select a Trip');
    $('#trips ol').empty();
  });
}); // end of doc ready
