

const clockIcon = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
const planeIcon = '<i class="fa fa-plane" aria-hidden="true"></i>';
const moneyIcon = '<i class="fa fa-money" aria-hidden="true"></i>';
const idIcon = '<i class="fa fa-folder-o" aria-hidden="true"></i>';
const categoryIcon = '<i class="fa fa-photo" aria-hidden="true"></i>';

const addDropdown = function addDropdown() {
  let tripUrl = 'https://trektravel.herokuapp.com/trips';
  $.get(tripUrl, (response) => {
    const continents = response.map(trip => trip.continent);
    const uniqueContinents = continents.filter((item, pos) => {
      return (continents.indexOf(item) === pos && item !== null);
    });
    let dropdown = ``;
    uniqueContinents.forEach((continent) => {
      dropdown += `<li><a href="#">${continent}</a></li>`;
    });
    $('#continents').html(dropdown);
  });
};

const loadTrips = function loadTrips(...args) {
  let tripUrl = 'https://trektravel.herokuapp.com/trips';
  tripUrl += (args.length === 0) ? '' : `/continent?query=${args[0]}`;
  console.log(tripUrl);
  $.get(tripUrl, (response) => {
    $('#trips').empty();
    // printing trips
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
  let tripUrl = 'https://trektravel.herokuapp.com/trips';
  $.get(`${tripUrl}/${id}`, (trip) => {
    const name = `<h2>${trip.name}</h2>`;
    const idNum = `<li>${idIcon} ${trip.id}</li>`;
    const location = `<li>${planeIcon} ${trip.continent}</li>`;
    const week = (trip.week > 1 ? 'weeks' : 'week');
    const time = `<li>${clockIcon} ${trip.weeks} ${week}</li>`;
    const cost = `<li>${moneyIcon} $${trip.cost.toFixed(2)}</li>`;
    const category = `<li>${categoryIcon} ${trip.category}</li>`;
    const about = `<p>${trip.about}</p>`;
    $('#trips').html(`${name}<ul>${idNum}${location}${time}${category}${cost}</ul>${about}`);
    $('form').attr('action', `${tripUrl}/${trip.id}/reservations`);
  }).fail(() => {
    $('#trips').html('<p>Oops.. looks like that trip left without you!</p>');
  }).always(() => {
    console.log('YOU GOT A TRIP!');
  });
};

$(document).ready(() => {
  $('ul.dropdown > li.is-dropdown-submenu-parent > a:eq(0)').click();

  $('#booking').hide();
  $('.dropdown').hide();
  $('h1').on('click', () => {
    $('#booking').hide();
    $('.dropdown').hide();
    $('#reserve').empty();
    $('#trips').empty();
  });

  $('#trips').on('click', '.trip', function fx() {
    console.log('you clicked a trip!');
    $('.dropdown').hide();
    openTrip(this.id);
    $('#reserve').empty();
    $('#booking').show();
  });

  $('#load').on('click', () => {
    addDropdown();
    $('.dropdown').show();
    $('#reserve').empty();
    $('#booking').hide();
    loadTrips();
  });

  $('.dropdown').on('click', 'ul li a', function fn() {
    const query = this.innerHTML;
    loadTrips(query);
  });

  $('form').submit(function fix(e) {
    e.preventDefault();
    const url = $(this).attr('action');
    const formData = $(this).serialize();
    $.post(url, formData, (response) => {
      console.log(response);
      $('#booking').hide();
      $('#reserve').html(`<p>Thanks ${response.name}! Your reservation has been saved! </p>`);
    }).fail(() => {
      $('#reserve').html('<p> Oops.. That didn\'t seem to save </p>');
    });
  });
});
