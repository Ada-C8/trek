/*eslint-disable*/
$(document).ready(() => {
  $('.reveal').click(() => {
    $('.reveal').hide();
    $('body').append('<table class="trips"><tr><th>Name</th><th>Continent</th><th>Duration</th></tr></table>');
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      response.forEach((trip) => {
        $('.trips').append(`<tr class="${trip.id}"><td class="${trip.id}">${trip.name}</td><td class="${trip.id}">${trip.continent}</td><td class="${trip.id}">${trip.weeks} Weeks</td></tr>`);
      });
      $('tr').click((e) => {
        const id = e.target.className;
        const url = `https://trektravel.herokuapp.com/trips/${id}`
        $.get(url, (response) => {
          console.log(response);
          $(`tr.${id}`).after(`<tr><td>${response.about}<td></tr>`)
        })
      });
    });
  });
});
