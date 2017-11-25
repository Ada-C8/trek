const baseURL = 'https://trektravel.herokuapp.com/trips';

$(document).ready(() => {
  const loadAllTrips = function () {
    $.get(baseURL, (response) => {
      console.log('worked');
      response.forEach((trip) => {
        const thisTrip = `<li id='${trip.id}'> ${trip.name} </li>`;
        $('#tripSection').append(thisTrip);
      });
    });
  };

  const tripDetails = (id) => {
    $.get(baseURL+ `/${id}`, (response) => {

    });
  }

  $('#trips').on('click', () => {
    loadAllTrips();
  });

  $('#tripSection ul').on('click', () => {
    let tripID = $(this).attr('id');
    tripDetails(tripID);
  });
});
