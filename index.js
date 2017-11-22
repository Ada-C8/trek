const ALL_TRIPS_URL = 'https://trektravel.herokuapp.com/trips';

$(document).ready(() => {
  $('#all-trips').click(function() {
    $.get(ALL_TRIPS_URL,
      response => {
        console.log('success!');
        console.log(response);

        response.forEach(function(trip) {
          let name = trip.name,
              // id = trip.id,
              continent = trip.continent,
              weeks = trip.weeks;
          let tripsAppend = `<li data-id=${trip.id}>` + '<h5 >' + name + '</h5></li>'

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
      });
    });

    // Event listening for individual trip click
    $('.list-trips').on('click', 'li', function(event) {
      let tripId = $(this).attr('data-id');
      let tripUrl = ALL_TRIPS_URL + '/' + `${tripId}`;
      $.get(tripUrl,
        response => {
          $(this).append(
            '<p>Location: ' + response.continent + '</p>' + '<p>Length: ' + response.weeks + ' weeks</p>' +
            '<p>Category: ' + response.category + '</p>' + '<p>Cost: $' + response.cost + '</p>' + '<p>Description: ' + response.about + '</p>').toggleClass('toggle');
          $(this).append('<div class="button">Make a Reservation</div>');
        });

      // listen for button click to make reservation
      $('.button').click(function() {
        // generate form
        $('li p:last-of-type').append('<form id="add-res"></form>');
        $('form').append('<label for="name">Name: </label><input type="text" name="name"></input>');
        $('form').append('<label for="age"></label>Age: <input type="number" name="age"></input>');
        $('form').append('<label for="email">Email: </label><input type="text" name="email"></input>');
        $('form').append('<input type="submit" value="Reserve trip"></input>');
      })

      let formData = $('#add-res').serialize();

      let resUrl = tripUrl + '/reservations';
      $.post(resUrl, formData, response => {
        console.log('successful reservation');
      })
      .fail((response) => {
        console.log('Did not post');
      });

      $(this).click((event) => {
        event.stopPropagation();
      });
  });
      });
