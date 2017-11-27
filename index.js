$(document).ready(() => {

  const loadTrips = function loadTrips() {
    $.get(
      'https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach((trip) => {
          const tripsInfo = `<li id="trip-${trip.id}"><p id="${trip.id}">${trip.name}</p></li>`;
          $('#trips ul').append(tripsInfo);
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
          <p> Duration: ${response.weeks} weeks</p>
          <p> Cost: ${response.cost}</p>
        </div>`;

        const reservation = `<form id="form" action="https://trektravel.herokuapp.com/trips/${id}/reservations" method="post">
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
          </form>`;

        $('#trips ul li > div').hide();
        $(`#trips ul li#trip-${id}`).append(tripInfo);
        $(`#trips ul li#trip-${id}`).append(reservation);
      },
    ).fail(() => {
      $('#fail').html('<p>Could not find</p>');
    }).always(() => {
      console.log('Function: loadTrip (single)');
    });
  }; // end of loadTrip

  $('#trips ul').on('click', 'p', function() {
    const tripID = $(this).attr('id');
    loadTrip(tripID);
  });

  $('#load').click(() => {
    loadTrips();
    $('h3').text('Select a Trip');
    $('#trips ul').empty();
  });

  $('body').on('submit', 'form', function (e) {
    e.preventDefault();

    const url = $(this).attr('action'); // this refers to the jquery object selected on it -- the specific form doing the submit
    const formData = $(this).serialize();

    console.log(formData);

    $.post(url, formData, () => { // on submit the js is doing this post request
      $('#form').html('<p> Reservation added </p>');
    }).fail(() => {
      $('#form').html('<p> Reservation failed </p>');
    }).always(() => {
      console.log("you're doing alright");
    });
  });
}); // end of doc ready
