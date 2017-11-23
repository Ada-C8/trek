$(document).ready(() => {

  const loadTrips = function loadTrips() {
    $.get(
      'https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach((trip) => {
          const tripsInfo = `<li><p id="${trip.id}">${trip.name}</p></li>`;
          $('#trips ol').append(tripsInfo);
        });
      },
    )
      .fail(() => {
        $('#fail').html('<p>Request was unsuccessful</p>');
      }).always(() => {
        console.log('always message here');
      });
  }; // end of loadTrips

  const loadTrip = function loadTrip(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        console.log(response);
        console.log(`trip retrieved ${response.id}`);
        const tripInfo = `<p> Trip ID: ${response.id}</p>`;

        $('#trip').append(tripInfo);
      },
    ).fail(() => {
      $('#fail').html('<p>Could not find</p>');
    }).always(() => {
      console.log('always message here');
    });
  }; // end of loadTrip


// You know how to add an event handler to an element if you give it a selector.
// How can you give a separate event handler to many similar things? (hint: look at our lecture on event delegation)
// Within this event handler: you need a way to get the value of the trip id.
// You can do this in two ways that I can think of right now:
//   - You can somehow leverage passing information around + ordering of functions to make this
//     available in JS
//   - You can somehow make this trip id information available in the HTML.
//     Then you would need to figure out how to get that information from the HTML.
  $('#trips ol').on('click', 'p', function() {
    const tripID = $(this).attr('id');
    loadTrip(tripID);
  });

  $('#load').click(() => {
    loadTrips();
    $('h3').text('Select a Trip');
    $('#trips ol').empty();
  });
}); // end of doc ready
