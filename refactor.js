/*eslint-disable*/
$(document).ready(() => {
  $('.show-trip').hide();
  let index = function index() {
    const url = 'https://trektravel.herokuapp.com/trips';
    $.get(url, (indexResponse) => {
      $('table:first-child').replaceWith('<table class="trips"><tr><th>Name</th><th>Continent</th><th>Duration</th></tr></table>');
      indexResponse.forEach((trip) => {
        $('.trips').append(`<tr class="${trip.id}"><td>${trip.name}</td><td>${trip.continent}</td><td>${trip.weeks} Weeks</td></tr>`);
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
    $('.show-trip').hide();
    $('.index-trips').show();
    $('.show-button').show();
    index();
  })
  $('.index-trips').on('click', 'tr', (e) => {
    // $(e.target).hide();
    const id = e.target.closest('tr').className;
    $('.index-button').show();
    $('.index-trips').hide();
    $('.show-trip').show();
    show(id);
  })
});
