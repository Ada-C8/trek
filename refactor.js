/*eslint-disable*/
$(document).ready(() => {
  let index = function index() {
    const url = 'https://trektravel.herokuapp.com/trips';
    $.get(url, (indexResponse) => {
      indexResponse.forEach((trip) => {
        $('.trips').append(`<tr class="${trip.id} basic"><td class="${trip.id}">${trip.name}</td><td class="${trip.id}">${trip.continent}</td><td class="${trip.id}">${trip.weeks} Weeks</td></tr>`);
      })
    })
  }
  let show = function show(trip) {
    const url = `https://trektravel.herokuapp.com/trips/${trip}`;
    $.get(url, (showResponse) => {
      console.log(showResponse);
    });
  };
  $('.index-button').click((e) => {
    $(e.target).hide();
    $('table:first-child').replaceWith('<table class="trips"><tr><th>Name</th><th>Continent</th><th>Duration</th></tr></table>');
    index();
  })
  $('.show-button').click(() => {
    show(1);
    $('.index-button').show();
  })
});
