const ALL_TRIPS_URL = 'https://trektravel.herokuapp.com/trips';

$(document).ready(() => {
  $('#all-trips').click(function() {
    $.get(ALL_TRIPS_URL,
      response => {
        console.log('success!');
        console.log(response);

        response.forEach(function(trip) {
          let name = trip.name,
              continent = trip.continent,
              weeks = trip.weeks;
          let tripsAppend = '<li>' + name + ' * ' + 'Location: ' + continent + ' * ' + 'Length: ' + weeks + ' weeks</li>'

          $('.list-trips ol').append(tripsAppend);
        });
      })
      .fail(function(response){
        console.log(response);
        console.log('failure');
        $('#fail').html('<p>Request was unsuccessful</p>')
      })
      .always(function(){
        console.log('always even if we have success or failure');
      }); // Note that this is where the semi-colon ends up
    });
  });
