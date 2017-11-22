const BASE_URL = 'https://trektravel.herokuapp.com/trips';
const getTrips = () => {
  $.get(BASE_URL, (response) => {
    console.log('success!');
    response.forEach((trip) => {
      const tripInfo = `<li data-id= ${trip.id} id = "trip-${trip.id}"><strong>${trip.name}</strong> - ${trip.weeks} week(s) in ${trip.continent} </li>`;
      $('#trip-list ul').append(tripInfo);
    });
  }).fail(() => {
    $('#message').html('<h3> No trips found :( )</h3>');
  }).always(() => {
      console.log('Adenture awaits you!');
  });
};
const hideDetails = () => {
  console.log('you hid the details');
  $('#trip-details').empty();
};
const reserveTrip = () => {
  console.log('you are reserving this trip');
}
const findTrip = (tripID) => {
  $.get(`https://trektravel.herokuapp.com/trips/${tripID}`, (response) => {
    console.log(response);
    const tripInfo = `
    <section>
      <h4>${response.name}<h/4>
      <p>Trip ID: ${response.id}
      </p>
      <p>Trip Destination: ${response.continent}</p>
      <p>Duration(in weeks): ${response.weeks}</p>
      <p>Category: ${response.category}</p>
      <p>Cost: $${response.cost}</p>
      <p>About: ${response.about}</p>
      <button id= "hide-details">Hide Details</button>
      <button id= "reserve-trip">Reserve this Trip</button>
    </section>
    `;
    // console.log(tripInfo);
    // $(`#trip-${tripID}`).append(tripInfo);
    $('#trip-details').append(tripInfo);
    // $('#trip-details').toggle();
    $('#hide-details').on('click', () => {
      // $('#trip-details').toggle();
      hideDetails();
    });
    $('#reserve-trip').on('click', () => {
      reserveTrip();
    });
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
    // $('#trip-list').toggle();
    getTrips();
  });
  $('#trip-list ul').on('click', 'li', function() {
    const tripID = $(this).attr('data-id');
    // $('#trip-details').toggle();
    findTrip(tripID);
    $('#trip-list ul').empty();
  });
});
