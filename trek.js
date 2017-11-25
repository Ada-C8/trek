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

  $('#trips').on('click', () => {
    loadAllTrips();
  });
});
