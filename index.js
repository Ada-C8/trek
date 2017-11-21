

const tripUrl = 'https://trektravel.herokuapp.com/trips';

const loadTrips = function loadTrips() {
  $.get(tripUrl, (response) => {
    response.forEach((trip) => {
      const name = `<h3>${trip.name}</h3>`;
      const location = `<li>${trip.continent}</li>`;
      const time = `<li>${trip.weeks}</li>`;
      console.log(trip);
      $('#trips').append(`<div class="trip">${name}<ul>${location}${time}</ul></div>`);
    });
  });
};

$(document).ready(() => {
  $('#load').on('click', () => {
    console.log('you clicked this');
    loadTrips();
  });
});
