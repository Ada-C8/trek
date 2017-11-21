/*eslint-disable*/

$(document).ready(() => {
  $('.reveal').click(() => {
    $('.reveal').hide();
    $('body').append('<table class="trips"><tr><th>Name</th><th>Continent</th><th>Duration</th></tr></table>');
    $.get('https://trektravel.herokuapp.com/trips', response => {
      response.forEach((trip) => {
        $('.trips').append('<tr><td>' + trip.name + '</td><td>' + trip.continent + '</td><td>' + trip.weeks + '</td></tr>')
      })
    })
  })
});
