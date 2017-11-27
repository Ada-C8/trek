const loadTrips = function loadTrips(response) {
  $('#title').html('');
  $('#content').html('<div id="content"><ul id="list"></ul></div>');
  $('body').removeClass('homepage');
  for (let i = 0; i < response.length; i += 1) {
    const trip = response[i];
    const weeks = trip.weeks === 1 ? 'week' : 'weeks';
    const tripHTML = `<li><h3><a class='trip' id='${trip.id}' href="#">${trip.name}</a></h3><ul><li>${trip.continent}</li><li>${trip.weeks} ${weeks}</li></ul></li>`;
    $('#list').append(tripHTML);
  }
};

const showTrip = function showTrip(response) {
  const tripHTML = `<a id='reserve' href='#' trip_id='${response.id}'>Reserve</a><h4>Details</h4><ul><li>ID: ${response.id}</li><li>Continent: ${response.continent}</li><li>About: ${response.about}</li><li>Category: ${response.category}</li><li>Weeks: ${response.weeks}</li><li>Cost: ${response.cost}</li></ul>`;
  $('#title').html(`${response.name}`);
  $('#content').html(tripHTML);
};

const createForm = function createForm() {
  const formElements = ['Name', 'Email', 'Age'];
  const tripID = $(this).attr('trip_id');
  const formAction = `https://trektravel.herokuapp.com/trips/${tripID}/reservations`;
  const sectionHTML = formElements.reduce((string, element) => `${string}<section><label>${element}</label><input type='text' id='${element.toLowerCase()}' name='${element.toLowerCase()}' /></section>`, '');
  const formHTML = `<form action=${formAction}>${sectionHTML}<section><button type='submit' class='button'>Reserve</button></section></form>`;

  $('#content').html(formHTML);
};

$(document).ready(() => {
  $('#load-trips').on('click', () => {
    const url = 'https://trektravel.herokuapp.com/trips';
    $.get(url, (response) => { loadTrips(response); });
  });
  $('#display').on('click', '.trip', (event) => {
    const url = `https://trektravel.herokuapp.com/trips/${event.target.id}`;
    $.get(url, (response) => {
      showTrip(response);
      $('#reserve').on('click', createForm);
    });
  });
  $('body').on('submit', 'form', (e) => {
    e.preventDefault();
    const url = $('form').attr('action');
    const formData = $('form').serialize();
    $.post(url, formData, () => {
      $('#messages').html('Reservation created.');
    }).fail(() => {
      $('#messages').html('Reservation failed.');
    });
  });
});
