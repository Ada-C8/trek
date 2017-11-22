

const tripUrl = 'https://trektravel.herokuapp.com/trips';
const clockIcon = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
const planeIcon = '<i class="fa fa-plane" aria-hidden="true"></i>';
const moneyIcon = '<i class="fa fa-money" aria-hidden="true"></i>';
const idIcon = '<i class="fa fa-folder-o" aria-hidden="true"></i>';
const categoryIcon = '<i class="fa fa-photo" aria-hidden="true"></i>';

const loadTrips = function loadTrips() {
  $.get(tripUrl, (response) => {
    $('#trips').empty();
    response.forEach((trip) => {
      const name = `<h3>${trip.name}</h3>`;
      const location = `<li>${planeIcon} ${trip.continent}</li>`;
      const week = (trip.week > 1 ? 'weeks' : 'week');
      const time = `<li>${clockIcon} ${trip.weeks} ${week}</li>`;
      $('#trips').append(`<div class="trip" id="${trip.id}">${name}<ul>${location}${time}</ul></div>`);
    });
  }).fail(() => {
    $('#trips').html('<p>Oops.. Check back for more adventures soon!</p>');
  }).always(() => {
    console.log('YAY! YOU GET A TRIP AND YOU GET A TRIP!');
  });
};

const openTrip = function openTrip(id) {
  $.get(`${tripUrl}/${id}`, (trip) => {
    const name = `<h2>${trip.name}</h2>`;
    const id = `<li>${idIcon} ${trip.id}</li>`;
    const location = `<li>${planeIcon} ${trip.continent}</li>`;
    const week = (trip.week > 1 ? 'weeks' : 'week');
    const time = `<li>${clockIcon} ${trip.weeks} ${week}</li>`;
    const cost = `<li>${moneyIcon} $${trip.cost.toFixed(2)}</li>`;
    const category = `<li>${categoryIcon} ${trip.category}</li>`;
    const about = `<p>${trip.about}</p>`;
    $('#trips').html(`${name}<ul>${id}${location}${time}${category}${cost}</ul>${about}`);
  }).fail(() => {
    $('#trips').html('<p>Oops.. looks like that trip left without you!</p>');
  }).always(() => {
    console.log('YOU GOT A TRIP!');
  });
};

$(document).ready(() => {
  $('#booking').hide();
  $('h1').on('click', () => {
    $('#trips').empty();
  });

  $('#trips').on('click', '.trip', function() {
    console.log('you clicked a trip!');
    openTrip(this.id);
    $('#booking').show();
  });

  $('#load').on('click', () => {
    $('#booking').hide();
    loadTrips();
  });
});
