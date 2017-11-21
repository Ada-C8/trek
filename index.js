const baseUrl = 'https://trektravel.herokuapp.com/trips'

$(document).ready(()=> {
  let loadTrips = function loadTrips() {
    $.get(baseUrl, (response) => {
      console.log('success!');
      console.log(response);

      generateHTML = '<ul>'
      response.forEach(function(trip) {
        console.log(trip);
        generateHTML += '<li>Name: ' + trip.name + ' Continent: ' + trip.continent + ' Weeks: ' + trip.weeks + '</li>';
      });
      generateHTML += '</ul>'
      $('#show-trips').html(generateHTML);
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>');
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  };



  $('#load').on('click', function(){
    loadTrips();
  });
});
