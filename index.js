const apiUrl = 'https://trektravel.herokuapp.com/trips';
// Utilities

const sPluralize = function sPluralize(word, qty) {
  if (qty === 1) {
    return word;
  }
  return `${word}s`;
};

const capitalize = function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

// Display List of Trips
const displayList = function displayList() {
  $('.home').removeClass('home');
  $('#list').removeClass('hide');
  $.get(apiUrl, (response) => {
    let list = '<ul>';
    response.forEach((thing) => {
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
      <h4>${response.weeks} ${sPluralize('week', response.weeks)} | ${response.continent} | ${capitalize(response.category)}</h4>
      <div id="about">${response.about}</div>`);
    $('#reservation-form').children('form').attr('id', id);
    $('#price').html(`$${response.cost.toFixed(2)} - Reserve!`);
  }).fail(() => {
    $('#message').addClass('failure').html('Oops! Something went wrong!');
  });
};

// Reservation Form Submission
const postReservation = function postReservation(response) {
  const url = `${apiUrl}/${response[0].id}/reservations`;
  const formData = response;
  $.post(url, formData.serialize(), (data) => {
    $('#confirmation').addClass('success').html(`${data.name} is booked!`);
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
    $('#list-wrapper').addClass('large-5');
    displayDetails($(this)[0].id);
  });

  // FORM
  // $('input:valid').on('input', function fx() {
  //   $(this).next('div').removeClass('hide');
  // });
  // $('input').focusout(function fx() {
  //   $(this).next('span').addClass('hide');
  // });
  $('form').submit(function fx(e) {
    e.preventDefault();
    postReservation($(this));
  });
});
