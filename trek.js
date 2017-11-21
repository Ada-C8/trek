const url = 'https://trektravel.herokuapp.com/trips';

$(document).ready( function() {
  $('#load').on('click', function(){
    $.get(url,
      (response) => {
        $('h1').append('List of Trips');
        for (trip of response) {
          let tripName = `<li><h3>${trip.name}</h3>
          </li>`
          $('#trips ul').append(tripName);
        }
      })
  });
});





// <p>Continent: ${trip.continent}</p>
// <p>Weeks: ${trip.weeks}</p>
