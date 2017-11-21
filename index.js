/* eslint-disable */
$(document).ready(() => {

  $('#all-trips').on('click', () => {
    const allTripsUrl = 'https://trektravel.herokuapp.com/trips';

    $.get(allTripsUrl, (response) => {
      console.log('success!');
      response.forEach((trip) => {
        const tripInfo = `<li><strong>${trip.name}</strong> - ${trip.weeks} week(s) in ${trip.continent} </li>`;
        $('#trip-list ul').append(tripInfo);
      });
    }).fail(() => {
      $('#message').html('<h3> No trips found :( )</h3>');
    }).always(() => {
        console.log('Adenture awaits you!');
    });
  });
});
