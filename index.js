

const tripUrl = 'https://trektravel.herokuapp.com/trips';
const clock = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
const plane = '<i class="fa fa-plane" aria-hidden="true"></i>';
const loadTrips = function loadTrips() {
  $.get(tripUrl, (response) => {
    response.forEach((trip) => {
      const name = `<h3>${trip.name}</h3>`;
      const location = `<li>${plane} ${trip.continent}</li>`;
      const week = (trip.week > 1 ? 'weeks' : 'week');
      const time = `<li>${clock} ${trip.weeks} ${week}</li>`;
      console.log(location);
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
