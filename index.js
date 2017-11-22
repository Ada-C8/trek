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
  $('#reservation-form').show();
  $.get(`${apiUrl}/${id}`, (response) => {
    $('#details').html(`<h3>${response.name}</h3>
      <h4>${response.weeks} weeks | ${response.continent} | ${response.category}</h4>
      <div class="about">${response.about}</div>
      <div class="cost">${response.cost}</div>`);
    $('#reservation-form').attr('id', id);
  }).fail(() => {
    $('#message').addClass('failure').html('Oops! Something went wrong!');
  });
};

// Reservation Form Submission
const postReservation = function postReservation(response) {
  const url = `${apiUrl}/${response[0].id}/reservations`;
  const formData = response;
  $.post(url, formData.serialize(), (data) => {
    $('#confirmation').html(`${data.name} is booked!`);
  })
    .fail(() => {
      $('#confirmation').addClass('failure').html('Uhh... Something happened. Please try again.');
    });
};

// Perform
$(document).ready(() => {
  // PREP
  $('#reservation-form').hide();

  // BASICS
  $('#get-list').click(displayList);
  $('#list').on('click', 'li', function fx() {
    displayDetails($(this)[0].id);
  });

  // FORM
  $('input').focusin(function fx() {
    $(this).next('span').removeClass('hide');
  });
  $('input').focusout(function fx() {
    $(this).next('span').addClass('hide');
  });
  $('form').submit(function fx(e) {
    e.preventDefault();
    postReservation($(this));
  });
});
