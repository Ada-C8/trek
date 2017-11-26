$(document).ready(() => {
  $('#load').click(() => {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      response.forEach((place) => {
        const location = `
        <h2> ${place.name} </h2>`;
        console.log(location);
        $('#location').append(location);
      });
    });
  });

  $('#load').on('click', () => {
    $('#location').empty();
  });

  // Function for request and response for a specific trip.

  const loadTrip = function loadTrip(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) => {
    console.log(response);
      const tripInfo = `
        <p> Id: ${response.id} </p>
        <p> Name: ${response.name} </p>
        <p> Destination: ${response.destination} </p>
        <p> Continent: ${response.continent} </p>
        <p> About: ${response.about} </p>
        <p> Category: ${response.category} </p>
        <p> Weeks: ${response.weeks} </p>
        <p> Cost: ${response.cost} </p>`;

      $('#tripinfo').html(tripInfo);
    },

  
