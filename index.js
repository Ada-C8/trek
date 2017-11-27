/* eslint-disable */
const BASE_URL = 'https://trektravel.herokuapp.com/trips';
const continents = [];
const getTrips = (url) => {
  $.get(url, (response) => {
    console.log('success!');
    console.log(response);
    response.forEach((trip) => {
      const tripInfo = `<li data-id= ${trip.id} id = "trip-${trip.id}"><strong>${trip.name}</strong> - ${trip.weeks} week(s) in ${trip.continent} </li>`;
      $('#trip-list ul').append(tripInfo);
      if (!continents.includes(trip.continent.toLowerCase()) && trip.continent) {
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
  // TODO: Add "Cancel" button to clear add new trip form
  const newTripForm = `
  <form id= "new-trip-form" action="https://trektravel.herokuapp.com/trips" method="post">
  <h3> ADD NEW TRIP </h3>
  <section>
    <div class = "form-input">
      <label>Name:</label>
      <input type="text" id="name" name="name"></input>
    </div>
    <div class = "form-input">
      <label>Continent:</label>
      <input type="text" id="continent" name="continent"></input>
    </div>
    <div class = "form-input">
      <label>About:</label>
      <input type="textfield" id="about" name="about"></input>
    </div>
    <div class = "form-input">
      <label>Category:</label>
      <input type="text" id="category" name="category"></input>
    </div>
    <div class = "form-input">
      <label>Weeks:</label>
      <input type="integer" id="weeks" name="weeks"></input>
    </div>
    <div class = "form-input">
      <label>Cost:</label>
      <input type="float" id="cost" name="cost"></input>
      </section>
    </div>
  <section class="button">
    <button type="submitReservation">Add This Trip</button>
  </section>
  </form>`;
  $('#trip-list').prepend(newTripForm);
  $('form').on('submit', function(e) {
    e.preventDefault();
    const formData = $(this).serialize();
    const url = $(this).attr('action');
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
      $('#trip-info').toggle();
      $('#trip-details form:last-child').empty();
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
    <section id= "trip-info">
      <h3>${response.name.toUpperCase()}</h3>
      <p>Trip ID: ${response.id}
      </p>
      <p>Trip Destination: ${response.continent}</p>
      <p>Duration(in weeks): ${response.weeks}</p>
      <p>Category: ${response.category}</p>
      <p>Cost: $${(response.cost).toFixed(2)}</p>
      <h4>About:</h4>
      <p>${response.about}</p>
      <div id = "find-trip-btns">
        <button id= "hide-details">Hide Details</button>
        <button id= "reserve-trip">Reserve this Trip</button>
      </div>
    </section>
    `;
    $('#trip-details').append(tripInfo);
    $('#hide-details').on('click', () => {
      hideDetails();
    });
    $('#reserve-trip').on('click', () => {
      reserveTrip(response.id);
      $('#trip-info').toggle();
    });
  });
};

$(document).ready(() => {
// events
  $('#all-trips').on('click', () => {
    $('#trip-details').empty();
    $('#message').empty();
    $('#trip-list form').empty();
    $('#welcome-img').toggle();
    getTrips(BASE_URL);
  });
  $('#trip-list ul').on('click', 'li', function() {
    const tripID = $(this).attr('data-id');
    // $('#trip-details').toggle();
    findTrip(tripID);
    $('#trip-list ul').empty();
  });
  $('#add-trip').on('click', () => {
    $('#trip-details').empty();
    $('#trip-list ul').empty();
    console.log('adding a trip');
    addTrip();
  });
});
