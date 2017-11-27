const baseURL = 'https://trektravel.herokuapp.com/trips';

$(document).ready(() => {
  $('#reservationForm').hide();
  $('#singleTripDetails').hide();
  $('#displayArea').hide();
  const loadAllTrips = () => {
    $.get(baseURL, (response) => {
      console.log('all trips worked');
      console.log(response);
      $('#displayArea').show();
      response.forEach((trip) => {
        const thisTrip = `<li id='${trip.id}'>${trip.name} </li>`;
        $('#tripSection').append(thisTrip);
      });
    }).fail(() => {
      console.log('Something went wrong with the load trips call');
    });
  };

  const tripDetails = (tripId) => {
    $.get(`${baseURL}/${tripId}`, (response) => {
      console.log('Single trip worked');
      console.log(response);
      if ($('#details').length > 0) {
        $('#details').remove();
      }

      if ($('#showForm').length > 0) {
        $('#showForm').remove();
      }
      const details = `
      <ul id='details'>
        <li id='${response.id}'><strong>ID:</strong> ${response.id} </li>
        <li><strong>Destination:</strong> ${response.name} </li>
        <li><strong>Continent:</strong> ${response.continent} </li>
        <li><strong>About:</strong> ${response.about} </li>
        <li><strong>Category:</strong> ${response.category} </li>
        <li><strong>Weeks:</strong> ${response.weeks} </li>
        <li><strong>Cost:</strong> ${response.cost} </li>
      </ul>`;

      $('#singleTripDetails').html(details);
      $('#singleTripDetails').show();
      $('#reservationForm').show();
      $('#nameField').val('');
      $('#emailField').val('');

    }).fail(() => {
      console.log('Something went wrong with the trip details');
    });
  };

  $('#trips').on('click', () => {
    loadAllTrips();
    $('#trips').hide();
  });

  $('#tripSection').on('click', 'li', (e) => {
    // I don't know how to make linter like this line.
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
      $('#reservationForm').hide();
      $('#singleTripDetails').hide();
    }).fail(() => {
      console.log('The post call failed');
    });
    return false;
  });
});
