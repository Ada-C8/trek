//* eslint-disable */
$.get(
  'https://trektravel.herokuapp.com/trips',
  (response) => {
    for (let i = 0; i < response.length; i += 1) {
      const { name } = response[i];
      const { continent } = response[i];
      const { weeks } = response[i];
      $('#trips').append(`<li><h3>${name}</h3><p>Continent: ${continent}</p>
      <p>Duration: ${weeks} weeks</p></li>`);
    }
  },
);

$(document).ready(() => {
  $('#all-trips').click(() => {
    $('#trips').toggle();
  });
});
