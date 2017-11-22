
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
    <button id="button"> Reserve this Trip </button>
    </div>`;
    console.log(tripInfo);
    $('#tripInfo').append(tripInfo);
    $('#tripList ol').hide();
  })
  .fail(function(response) {
    console.log(response);
    $('#fail').html('<p>Request was unsuccessful</p>')
  })
  .always(function() {
    console.log('Looking for adventure...');
  });
}; // end of viewTrip function
$(document).ready(() => {

  $('#button').on('click', () => {
    getTrips();
  });

  $('#tripList ol').on('click', 'li', function() {
    const tripID = $(this).attr('data-id');
    viewTrip(tripID);
  });

  $('#tripInfo').on('click', 'div',  function() {
    // const tripID = $(this).attr('data-id');
    $(this).hide();
    $('#tripList ol').show();
  });

});

// EVENTS
