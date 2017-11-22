/* Wave 3: While viewing a single trip, you can reserve a spot
Use a form to submit your name to reserve a spot on the trip you are viewing. */
const apiUrl = 'https://trektravel.herokuapp.com/trips';

// Display List of Trips
const displayList = function displayList() {
  $.get(apiUrl, (response) => {
    let list = '<ul>';
    response.forEach((thing) => {
      console.log(thing);
      list += `<li id="${thing.id}">${thing.name}</li>`;
    });
    list += '</ul>';
    $('#list').html(list);
  }).fail(() => {
    $('#message').addClass('failure').html('Oops! Something went wrong!');
  });
};

// Display Details of Trip
const displayDetails = function displayDetails(id) {
  $.get(`${apiUrl}${id}`, (response) => {
    $('#trip-detail').html(`<h3>${response.name}</h3>
      <h4>${response.weeks} weeks | ${response.continent} | ${response.category}</h4>
      <div class="about">${response.about}</div>
      <div class="cost">${response.cost}</div>`);
  }).fail(() => {
    $('#message').addClass('failure').html('Oops! Something went wrong!');
  });
};

// Reservation Form Submission
// $('form').submit((e) => {
//   e.preventDefault();
//
//   const url = `${apiUri}/${id}/reservations`;
//   const formData = $(this).serialize();
//   console.log($(this));
//   // $.post(url, formData, (response) => {
//   //   $('#message').html('<p> Pet added! </p>');
//   //   // What do we get in the response?
//   //   console.log(response);
//   // });
// });

// Perform
$(document).ready(() => {
  $('#get-list').click(displayList);
  $('#list').on('click', 'li', function fx() {
    displayDetails($(this)[0].id);
  });

});
