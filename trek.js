$(document).ready(() => {
  $('#load').click(() => {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      response.forEach((place) => {
        const locations = `
        <h2> ${place.name} </h2>`;
        console.log(locations);
        $('#locations').append(locations);
      });
    });
  });

  $('#load').on('click', () => {
    $('#locations').empty();
  });
});
