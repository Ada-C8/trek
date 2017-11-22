const ALL_TRIPS_URL = 'https://trektravel.herokuapp.com/trips';

// build individual trip data
// build form

// build all trips
let buildAllTrips = function buildAllTrips() {

  const successResponse = function successResponse(response) {
    $(".result").html("Success");
    response.forEach(function(trip) {
      let name = trip.name,
          continent = trip.continent,
          weeks = trip.weeks;
      let tripsAppend = `<li data-id=${trip.id}>` + '<h5 >' + name + '</h5></li>'

      $('.list-trips ul').append(tripsAppend);
    });
  };

  const failResponse = function failResponse() {
    $(".result").html("Failed to make reservation");
  };

  $.get(ALL_TRIPS_URL,
    response => {
      successResponse(response);
    })
  .fail(failResponse())
};

$(document).ready(() => {
  // listen for all-trips
  $('#all-trips').click(function() {
    buildAllTrips()
  }); //#all-trips

  // Event listening for individual trip click
  $('.list-trips').on('click', 'li', function(event) {
    let tripId = $(this).attr('data-id');
    let tripUrl = ALL_TRIPS_URL + '/' + `${tripId}`;
    $.get(tripUrl, response => {
      $(this).append(
        '<p>Location: ' + response.continent + '</p>' + '<p>Duration: ' + response.weeks + ' (week(s))</p>' +
        '<p>Category: ' + response.category + '</p>' + '<p>Cost: $' + response.cost + '</p>' + '<p>Description: ' + response.about + '</p>')
      $(this).append('<div class="button">Make a Reservation</div>');

      $(this).click((event) => {
        event.stopPropagation();
      });

      // listen for button click to make reservation
      $(this).one('click', 'div', function() {
        // generate form
        let form = `<form action="${tripUrl}/reservations" id="add-res">
        <label for="name">Name: </label><input type="text" name="name"></input>
        <label for="age"></label>Age: <input type="number" name="age"></input>
        <label for="email">Email: </label><input type="text" name="email"></input>
        <input type="submit" value="Reserve trip"></input>
        </form>`;
        $(this).after(form).hide();

        // listen for submit and post
        $('#add-res').submit(function(event) {
          event.preventDefault();

          let resUrl = $('#add-res').attr('action');
          let formData = $('#add-res').serialize();

          const successResponse = function successResponse() {
            console.log('Post successful');
            $("#add-res").html("Successfully made reservation");
          };

          const failResponse = function failResponse() {
            console.log('Post unsuccessful');
            $(".result").html("Failed to make reservation");
          };

          $.post(resUrl, formData, successResponse()).fail(failResponse())
          // });
        }); //submit res

      }); //.one click to make res

    });


});
}); //document.ready
