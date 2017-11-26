const baseURL = 'https://trektravel.herokuapp.com/trips';

$(document).ready(() => {
  $('#reservationForm').hide();

  const loadAllTrips = () => {
    $.get(baseURL, (response) => {
      console.log('all trips worked');
      response.forEach((trip) => {
        const thisTrip = `<li id='${trip.id}'> ${trip.name} </li>`;
        $('#tripSection').append(thisTrip);
      });
    }).fail(() => {
      console.log('Something went wrong with the load trips call');
    });
  };

  const tripDetails = (id) => {
    $.get(`${baseURL}/${id}`, (response) => {
      console.log('Single trip worked');
      if ($('#details').length > 0) {
        $('#details').remove();
      }

      if ($('#showForm').length > 0) {
        $('#showForm').remove();
      }
      const details = `
      <ul id='details'>
        <li id='${response.id}'>ID: ${response.id} </li>
        <li>Destination: ${response.name} </li>
        <li>Continent: ${response.continent} </li>
        <li>About: ${response.about} </li>
        <li>Category: ${response.category} </li>
        <li>Weeks: ${response.weeks} </li>
        <li>Cost: ${response.cost} </li>
      </ul>`;

      $(`#singleTripDetails`).html(details);
      $('#reservationForm').show();
      $('#nameField').val('');
      $('#emailField').val('');
    }).fail(() => {
      console.log('Something went wrong with the trip details');
    });
  };

  $('#trips').on('click', () => {
    loadAllTrips();
  });

  $('#tripSection').on('click', 'li', (e) => {
    const id = e.target.id;
    tripDetails(id);
  });

  $('#reservationForm').on('submit', () => {
    console.log('Submission started');
    const url = `${baseURL}/${$('#details li')[0].id}/reservations`;
    const data = $('#reservationForm').serialize();
    $.post(url, data, (response) => {
      console.log('POST worked');
      console.log(response);
    }).fail(() => {
      console.log('The post call failed');
    });
    return false;
  });
});
