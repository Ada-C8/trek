const GetAllTrips = (response) => {
  $('section').append('<h1>All Trips</h1><ul>');
  response.forEach((trip) => {
    const name = trip['name'];
    $('section').append(`<li>${name}</li>`);
  })
  $('section').append('</ul>');
};
const SendRequest = function (url, request) {
  $.get(url, request);
}

$(document).ready(() => {
  // const loadItem = document.getElementById('button');
  $('button').on('click', () => {
    console.log('booga');
    SendRequest('https://trektravel.herokuapp.com/trips', GetAllTrips);
  });
});
