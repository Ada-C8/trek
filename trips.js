$(document).ready( function() {
  $('#reserve').hide('form');

  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      console.log('success!');
      response.forEach(function(trip) {
        let tripInfo = `<li><h3 data-id=${trip.id}>${trip.name}</h3><p>Continent: ${trip.continent}</p><p>Trip Length: ${trip.weeks} Weeks</p></li>`;
        $('#trips ul').append(tripInfo);
      });
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>');
    });
  };

  const loadTrip = function loadTrip(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) => {
      let tripInfo = '<h3 data-id="' + response.id + '">' + response.name + '</h3><section class="details"><p>Trip ID: ' + response.id + '</p><p>Destination: ' + response.continent + '</p><p>' + response.about + '</p><p>Category: ' + response.category + '</p><p>Duration: ' + response.weeks + ' Weeks</p><p>Cost: $' + response.cost + '</p></section>';
      $('#trip').append(tripInfo);
      $('#trip').append('<img src="photo1.jpg" alt="Beach in Asia"/>');
      $('#trip').append('<button>Reserve Your Spot Now!</button>');
    })
    .fail(function(response) {
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>');
    });
  };

  $('#reserve').submit(function(e) {
    e.preventDefault();
    const tripID = $('#trip').find('h3').attr('data-id')
    const url = $(this).attr('action') + `/${tripID}/reservations`;
    const formData = $(this).serialize();

    $.post(url, formData, (response) => {
      $('#message').html('<p>Spot reserved!</p>');
      $('#reserve').hide('form');
    }).fail(() => {
      $('#message').html('<p>Reservation failed to save.</p>');
    });
  });

  $('button#search').click(function() {
    loadTrips();
    $('#trip').empty();
    $('button#search').html('Find Trips');
  });

  $('#trips ul').on('click', 'h3', function() {
    let tripID = $(this).attr('data-id');
    loadTrip(tripID);
    $('#trips li').remove();
    $('button#search').html('Back to Trips');
  });

  $('#trip').on('click', 'button', function() {
    $('#reserve').slideToggle();
    $('button#reserve').html('Cancel');
  });
});
