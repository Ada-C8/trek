$(document).ready(() => {

  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach(function(trip) {
          const tripInfo = `<li><h3> Travel to ${trip.name}</h3></li>`
          $(`#trips ol`).append(tripInfo);
        })
      })
  };


  $('#load').on('click', function() {
    loadTrips();
  });

}); //end of doc ready
