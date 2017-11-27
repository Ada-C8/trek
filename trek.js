$(document).ready(() => {
  // Function for Ajax request and response for all trips.
  $('#load').click(() => {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      response.forEach((place) => {
        const location = `<li><a><h3 data-id="${place.id}"> ${place.name} </h3></a></li>`;
        // console.log(response);
        // console.log(location);
        $('#location').append(location);
      });
    })
      .fail((response) => {
        console.log(response);
        $('#fail').html('<p>Request was unsuccessful</p>');
      })
      .always(() => {
        console.log('always even if we have success or failure');
      });
  });

  // Function for request and response for a specific trip.

  const loadSingleTrip = (id) => {
    $.get(`https:trektravel.herokuapp.com/trips/${id}`, (response) => {
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
    })
      .fail((response) => {
        console.log(response);
        $('#fail').html('<p>Request was unsuccessful</p>');
      })
      .always(() => {
        console.log('always even if we have success or failure');
      });
  };

  // EVENTS
  $('#location').on('click', 'h3', (event) => {
    const tripID = $(event.currentTarget).attr('data-id');
    loadSingleTrip(tripID);
  });

  $('#load').on('click', () => {
    $('#location').empty();
  });
});
