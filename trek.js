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
        <li>ID: ${response.id} </li>
        <li>Destination: ${response.name} </li>
        <li>Continent: ${response.continent} </li>
        <li>About: ${response.about} </li>
        <li>Category: ${response.category} </li>
        <li>Weeks: ${response.weeks} </li>
        <li>Cost: ${response.cost} </li>
      </ul>`;

      $(`#singleTripDetails`).html(details);
      $('#reservationForm').show();
    });
  };

  $('#trips').on('click', () => {
    loadAllTrips();
  });

  $('#tripSection').on('click', 'li', (e) => {
    const id = e.target.id;
    tripDetails(id);
  });

  const postSuccessful = (response) => {
    console.log("POST worked");
    console.log(response);
  }

  $('#reservationForm').on('submit', (e) => {
    console.log('Submission started');
    const postURL = `${baseURL}/${$(this).data('id')}/reservations`;
    const data = $('#reservationForm').serialize();
    $.post(postURL, data, postSuccessful).fail(() => {
      console.log('something went wrong with the post');
    });
  });
});
