const BASE_URL = 'https://trektravel.herokuapp.com/trips';
const getTrips = () => {
  $.get(BASE_URL, (response) => {
    console.log('success!');
    response.forEach((trip) => {
      const tripInfo = `<li data-id= ${trip.id}><strong>${trip.name}</strong> - ${trip.weeks} week(s) in ${trip.continent} </li>`;
      $('#trip-list ul').append(tripInfo);
    });
  }).fail(() => {
    $('#message').html('<h3> No trips found :( )</h3>');
  }).always(() => {
      console.log('Adenture awaits you!');
  });
};
const findTrip = (tripID) => {
  $.get(`https://trektravel.herokuapp.com/trips/${tripID}`, (response) => {
    console.log(response);
  });
};

$(document).ready(() => {
  // const BASE_URL = 'https://trektravel.herokuapp.com/trips';
  // const getTrips = () => {
  //   $.get(BASE_URL, (response) => {
  //     console.log('success!');
  //     response.forEach((trip) => {
  //       const tripInfo = `<li data-id= ${trip.id}><strong>${trip.name}</strong> - ${trip.weeks} week(s) in ${trip.continent} </li>`;
  //       $('#trip-list ul').append(tripInfo);
  //     });
  //   }).fail(() => {
  //     $('#message').html('<h3> No trips found :( )</h3>');
  //   }).always(() => {
  //       console.log('Adenture awaits you!');
  //   });
  // };
  // const findTrip = (tripID) => {
  //   $.get(`https://trektravel.herokuapp.com/trips/${tripID}`, (response) => {
  //     console.log(response);
  //   });
  // };
// events
  $('#all-trips').on('click', () => {
    getTrips();
  });
  $('#trip-list ul').on('click', 'li', function() {
    const tripID = $(this).attr('data-id');
    findTrip(tripID);
  });
});
