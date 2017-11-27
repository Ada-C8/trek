$(document).ready(() => {

  const loadTrips = function loadTrips() {
    $.get(
      'https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach((trip) => {
          const tripsInfo = `<li id="trip-${trip.id}"><p id="${trip.id}">${trip.name}</p></li>`;
          $('#trips ol').append(tripsInfo);
        });
      },
    )
      .fail(() => {
        $('#fail').html('<p>Request was unsuccessful</p>');
      }).always(() => {
        console.log('Function: loadTrips (plural)');
      });
  }; // end of loadTrips

  const loadTrip = function loadTrip(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        const tripInfo =
        `<div>
          <p> Trip name: ${response.name}</p>
          <p> Category: ${response.category}</p>
          <p> Continent: ${response.continent}</p>
          <p> Description: ${response.about}</p>
          <p> Duration: ${response.weeks}</p>
          <p> Cost: ${response.cost}</p>
        </div>`;

        const reservation = `<form action="https://trektravel.herokuapp.com/trips/${id}/reservations" method="post">
            <section>
              <label>Name</label>
              <input type="text" id="name" name="name"></input>
            </section>

            <section>
              <label>Email</label>
              <input type="text" id="email" name="email"></input>
            </section>

            <section class="button">
              <button type="submit">Reserve Trip</button>
            </section>
          </form>`

        $(`#trips ol li > div`).hide();
        $(`#trips ol li#trip-${id}`).append(tripInfo);
        $(`#trips ol li#trip-${id}`).append(reservation);
      },
    ).fail(() => {
      $('#fail').html('<p>Could not find</p>');
    }).always(() => {
      console.log('Function: loadTrip (single)');
    });
  }; // end of loadTrip

  $('#trips ol').on('click', 'p', function() {
    const tripID = $(this).attr('id');
    loadTrip(tripID);
  });

  $('#load').click(() => {
    loadTrips();
    $('h3').text('Select a Trip');
    $('#reserve').hide();
    $('#trips ol').empty();
  });
}); // end of doc ready
