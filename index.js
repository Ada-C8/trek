// a tag event.preventDefault

const ALL_TRIPS_URL = 'https://trektravel.herokuapp.com/trips';

// build all trips
let buildAllTrips = function buildAllTrips() {

  const successResponse = function successResponse(response) {
    let allTrips = '';
    response.forEach(function(trip) {
      let name = trip.name,
          continent = trip.continent,
          weeks = trip.weeks;
      let tripsAppend = `<li data-id=${trip.id}>` + '<h5 >' + name + '</h5></li>'
      allTrips += tripsAppend;
    });
    $('.list-trips ul').html(allTrips);
  };

  const failResponse = function failResponse() {
    $(".result").html("Failed to make reservation").show().delay(1000).fadeOut();
  };

  $.get(ALL_TRIPS_URL,
    response => {
      successResponse(response);
    })
  .fail(failResponse)
};

// submit reservation
let createReservation = function createReservation(event) {
  event.preventDefault();

  let resUrl = $('#add-res').attr('action');
  let formData = $('#add-res').serialize();

  const successResponse = function successResponse() {
    console.log('Post successful');
    $("#add-res").html("Successfully made reservation");
    $(this).siblings('.make-reservation').show();
  };

  const failResponse = function failResponse() {
    console.log('Post unsuccessful');
    $(".result").html("Failed to make reservation");
  };

  $.post(resUrl, formData, successResponse()).fail(failResponse)
  // });
}; //submit res

// build individual trip details
let buildIndividualTrip = function buildIndividualTrip(event) {
  console.log($(this).children());
  if ($(this).find('div').length > 0) {
    $(this).find('div')[0].remove();
    return;
  }
    let tripId = $(this).attr('data-id');
    let tripUrl = ALL_TRIPS_URL + '/' + `${tripId}`;
    $.get(tripUrl, response => {
      let $div = $('<div></div>');
      $($div).append(
        '<p><span>Location: </span>' + response.continent + '</p>' + '<p><span>Duration: </span>' + response.weeks + ' (week(s))</p>' +
        '<p><span>Category: </span>' + response.category + '</p>' + '<p><span>Cost: </span>$' + response.cost + '</p>' + '<p><span>Description: </span>' + response.about + '</p>' +
        '<div class="button make-reservation">Make a Reservation</div>')
      $($div).append('');
      $(this).append($div);
      // $(this).click((event) => {
      //   event.stopPropagation();
      // });

      // listen for button click to make reservation
      $(this).one('click', 'div.button', function(event) {
        // generate form
        event.stopPropagation();
        let form = `<form action="${tripUrl}/reservations" id="add-res">
        <label for="name"><span>Name:</span></label><input type="text" name="name"></input>
        <label for="age"><span>Age: </span></label><input type="number" name="age"></input>
        <label for="email"><span>Email: </span></label><input type="text" name="email"></input>
        <input type="submit" value="Reserve trip"></input>
        </form>`;
        $(this).after(form).hide();
      }); //.one click to make res
    });
}
// function to stop propagation of click event
let stopPropagation = function stopPropagation(event) {
  event.stopPropagation();
};

// li represents each trip;
$(document).ready(() => {
  // listen for all-trips
  $('#all-trips').click(function() {
    buildAllTrips()
  }); //#all-trips

  // Event listening for individual trip click
  $('.list-trips').on('click', 'li', buildIndividualTrip)

  // listen for submit and post
  $('.list-trips').on('submit', '#add-res', createReservation);
  $('.list-trips').on('click', '#add-res', stopPropagation);
}); //document.ready
