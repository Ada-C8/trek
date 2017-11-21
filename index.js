
const getTrips = () => {
  $.get('https://trektravel.herokuapp.com/trips', (response) => {
    console.log('success!');
    response.forEach((trip) => {
      const tripInfo = `<li><strong id = 'trip-name'>${trip.name}</strong> - ${trip.weeks} week(s) in ${trip.continent} </li>`;
      $('#trip-list ul').append(tripInfo);
    });
  }).fail(() => {
    $('#message').html('<h3> No trips found :( )</h3>');
  }).always(() => {
      console.log('Adenture awaits you!');
  });
};

$(document).ready(() => {

  $('#all-trips').on('click', () => {
    getTrips();
  });
  $('#trip-list li').on('click', () => {
    console.log(`you clicked me! I am a: ${this}`);
    $.get(showTripURL, (response) => {
      console.log('you showed the trip!');

    })
  });
});
