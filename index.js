
const getTrips = function getTrips() {
  $('#tripList ol').show();
  $.get('https://trektravel.herokuapp.com/trips', (response) => {
    console.log(response);
    response.forEach((trip) => {
      const tripName = `<li data-id="${trip.id}">${trip.name}</li>`;
      $('#tripList ol').append(tripName);
    });
  })
  .fail(() => {
    console.log('failure');
  })
  .always(() => {
    console.log('always even if we have success or failure');
  });
}; // end of getTrips function


const viewTrip = function viewTrip(tripID) {
  $.get(`https://trektravel.herokuapp.com/trips/${tripID}`, (response) => {
    // console.log(response);
    const tripInfo =
    `<div data-id="${response.id}">
    <p> ~ Click Anywhere to Hide ~ </p>
    <h2> ${response.name} </h2>
    <p> Continent: ${response.continent} </p>
    <p> Description: ${response.about} </p>
    <p> Category: ${response.category} </p>
    <p> Weeks: ${response.weeks} </p>
    <p> Cost: ${response.cost} </p>
    </div>
    <button id="reserveFormButton" data-id="${response.id}"> Reserve this Trip </button>`;
    console.log(tripInfo);
    $('#tripInfo').append(tripInfo);
    $('#tripList ol').hide();
  })
  .fail((response) => {
    console.log(response);
    $('#fail').html('<p>Request was unsuccessful</p>')
  })
  .always(() => {
    console.log('Looking for adventure...');
  });
}; // end of viewTrip function

const reserveForm = function reserveTripForm(tripID) {
  console.log(tripID);
  const reservationForm = `
  <div id="message"></div>
  <form action="https://trektravel.herokuapp.com/trips/${tripID}/reservations" method="post">
  <section>
  <label>Name</label>
  <input type="text" id="name" name="name"></input>
  </section>
  <section class="button">
  <button type="submit">Finalize Reservation</button>
  </section>
  </form>`;
  $('#reserveFormField').append(reservationForm);
  finalizeReservation();
}; // end of reserveTrip function

const finalizeReservation = function finalizeReservation() {
  $('#reserveFormField').on('submit', 'form', function(e) {

    e.preventDefault();
    const url = $(this).attr('action'); // Retrieve the action from the form
    console.log(url);
    const formData = $(this).serialize();
    $(this).hide();
    $.post(url, formData, (response) => {
      $('#message').html('<p> Trip Reserved! </p>');
      // What do we get in the response?
      console.log(response);
    }).fail(() => {
      $('#message').html('<p>Reserving Trip Failed</p>');
    });
  });
};

$(document).ready(() => {

  $('#button').on('click', () => {
    getTrips();
  });

  $('#tripInfo').on('click', '#reserveFormButton', function() {
    console.log('SOMETHING IS HAPPENING');

    const tripID = $(this).attr('data-id');
    console.log($(this));
    $(this).hide();

    reserveForm(tripID);
  });

  $('#tripList ol').on('click', 'li', function() {
    const tripID = $(this).attr('data-id');
    viewTrip(tripID);
  });

  $('#tripInfo').on('click', 'div',  function() {
    $(this).hide();
    $('#tripList ol').show();
  });
});
// EVENTS
