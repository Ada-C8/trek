const GetAllTrips = (response) => {
  $('section').append('<h1>All Trips</h1><ul>');
  response.forEach((trip) => {
    const name = trip['name'];
    $('section').append(`<li>${name}</li>`);
  })
  $('section').append('</ul>');
};

$(document).ready(() => {
  $('button').on('click', () => {
    $.get('https://trektravel.herokuapp.com/trips', GetAllTrips);
  });
});
