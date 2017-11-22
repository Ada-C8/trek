/* eslint-disable */
$.get('https://trektravel.herokuapp.com/trips',
response => {
  for (let i = 0; i < response.length; i += 1) {
    const name = response[i].name;
    const continent = response[i].continent;
    const weeks = response[i].weeks;
    $('#trips').append(`<li><h3>${name}</h3><p>Continent: ${continent}</p>
      <p>Duration: ${weeks} weeks</p></li>`);
  }
});

$(document).ready(function () {
  $('#all-trips').click(function () {
    $('#trips').toggle();
  });
});
