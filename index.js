/*eslint-disable*/
$(document).ready(() => {
  $('.reveal').click(() => {
    $('.reveal').hide();
    $('body').append('<table class="trips"><tr><th>Name</th><th>Continent</th><th>Duration</th></tr></table>');
    $.get('https://trektravel.herokuapp.com/trips', (indexResponse) => {
      indexResponse.forEach((trip) => {
        $('.trips').append(`<tr class="${trip.id} basic"><td class="${trip.id}">${trip.name}</td><td class="${trip.id}">${trip.continent}</td><td class="${trip.id}">${trip.weeks} Weeks</td></tr>`);
        const url = `https://trektravel.herokuapp.com/trips/${trip.id}`;
        $.get(url, (showResponse) => {
          $(`tr.${trip.id}`).after(`<tr class="more"><td colspan=2><p>About Trip</p>${showResponse.about}<p>Category: ${showResponse.category}<p>Cost: $${showResponse.cost}</p></td></tr>`);
          $('.more').hide();
        });
        $('tr.basic').click((e) => {
            console.log($(e.target.parent));
            console.log($(e.target.parent).next('.more'));
            $(e.target.parent).next('.more').toggle();
        });
      });
      // $('tr').click((e) => {
      //   const id = e.target.className;
      //   const url = `https://trektravel.herokuapp.com/trips/${id}`
      //
      // });
    });
  });
});
