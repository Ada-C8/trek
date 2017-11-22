/* eslint-disable */

// look up event delegation to access and update dynamically added elements

const BASE_URL = 'https://trektravel.herokuapp.com/trips';
const continents = [];
const getTrips = () => {
  $.get(BASE_URL, (response) => {
    console.log('success!');
    response.forEach((trip) => {
      const tripInfo = `<li data-id= ${trip.id} id = "trip-${trip.id}"><strong>${trip.name}</strong> - ${trip.weeks} week(s) in ${trip.continent} </li>`;
      $('#trip-list ul').append(tripInfo);
      if (!continents.includes(trip.continent) && trip.continent) {
        continents.push((trip.continent).toLowerCase());
      };
    });
  }).fail(() => {
    $('#message').html('<h3> No trips found :( )</h3>');
  }).always(() => {
      console.log('Adenture awaits you!');
  });
};
const addTrip = () => {
  const newTripForm = `
  <h3> Add a New Trip! </h3>
  <form id= "new-trip-form" action="https://trektravel.herokuapp.com/trips" method="post">
  <section>
    <label>Name</label>
    <input type="text" id="name" name="name"></input>
    <label>Continent</label>
    <input type="text" id="continent" name="continent"></input>
    <label>About</label>
    <input type="text" id="about" name="about"></input>
    <label>Category</label>
    <input type="text" id="category" name="category"></input>
    <label>Weeks</label>
    <input type="integer" id="weeks" name="weeks"></input>
    <label>Cost</label>
    <input type="float" id="cost" name="cost"></input>
  </section>

  <section class="button">
    <button type="submitReservation">Add This Trip</button>
  </section>
  </form>`;
  $('#trip-list').prepend(newTripForm);
  $('form').on('submit', function(e) {
    e.preventDefault();
    const formData = $(this).serialize();
    const url = $(this).attr('action');
    console.log(url);
    console.log(formData);
    $.post(url, formData, (response) => {
      $('#message').html(`<h3 id= "status-message"> Successfully added new trip: ${response.name}</h3>`);
      console.log(`Success! New Trip added`);
      // $('#trip-details').empty();
    }).fail(() => {
      $('#message').html('<h3 id= "status-message"> Error: Unable to create new trip</h3>');
      console.log(`Try again.`);
    });
  });
}
const hideDetails = () => {
  console.log('you hid the details');
  $('#trip-details').empty();
};
const reserveTrip = (tripID) => {
  console.log(`you are reserving this trip with id ${tripID}`);
  const reservationForm = `<form id= "reservation-form" action="https://trektravel.herokuapp.com/trips/${tripID}/reservations" method="post">
  <section>
    <label>Name</label>
    <input type="text" id="name" name="name"></input>
  </section>

  <section class="button">
    <button type="submitReservation">Reserve My Spot</button>
  </section>
  </form>`;
  $('#trip-details').append(reservationForm);
  $('form').submit(function(e) {
    e.preventDefault();
    const formData = $(this).serialize();
    const url = $(this).attr('action');
    $.post(url, formData, (response) => {
      $('#message').html(`<h3 id= "status-message"> Successfully reserved this trip for ${response.name}</h3>`);
      console.log(`Success! You're on the list.`);
      // $('#trip-details').empty();
    }).fail(() => {
      $('#message').html('<h3 id= "status-message"> Sorry, there are no spots left for this trip.</h3>');
      console.log(`Sorry, no spots left.`);
    });
  });
};
const findTrip = (tripID) => {
  $.get(`https://trektravel.herokuapp.com/trips/${tripID}`, (response) => {
    console.log(response);
    const tripInfo = `
    <section>
      <h4>${response.name}<h/4>
      <p>Trip ID: ${response.id}
      </p>
      <p>Trip Destination: ${response.continent}</p>
      <p>Duration(in weeks): ${response.weeks}</p>
      <p>Category: ${response.category}</p>
      <p>Cost: $${response.cost}</p>
      <p>About: ${response.about}</p>
      <button id= "hide-details">Hide Details</button>
      <button id= "reserve-trip">Reserve this Trip</button>
    </section>
    `;
    // console.log(tripInfo);
    // $(`#trip-${tripID}`).append(tripInfo);
    $('#trip-details').append(tripInfo);
    // $('#trip-details').toggle();
    $('#hide-details').on('click', () => {
      // $('#trip-details').toggle();
      hideDetails();
    });
    $('#reserve-trip').on('click', () => {
      reserveTrip(response.id);
    });
  });
};
$(document).ready(() => {
// events
  $('#all-trips').on('click', () => {
    // $('#trip-details').empty();
    $('#message').empty();
    getTrips();
  });
  $('#trip-list ul').on('click', 'li', function() {
    const tripID = $(this).attr('data-id');
    // $('#trip-details').toggle();
    findTrip(tripID);
    $('#trip-list ul').empty();
  });
  $('#add-trip').on('click', () => {
    // $('#trip-details').empty();
    console.log('adding a trip');
    addTrip();
  });
});
