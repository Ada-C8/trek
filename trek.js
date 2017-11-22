const SubmitTripReservation = function SubmitTripReservation() {
  event.preventDefault();
  const url = `https://trektravel.herokuapp.com/trips/${response['id']}/reservations`;
  const formData = $(this).serialize();
  $.post(url, formData, (response) => {
    $('#main-content').append('<p> Reservation confirmed! </p>');
  }).fail(() => {
    $('#main-content').append('<p>Reservation Failed</p>');
  });
};

const GetAllTrips = (response) => {
  let tripList = '';
  tripList += '<section id="main-content"><h1>All Trips</h1><ul>';
  response.forEach((trip) => {
    let name = trip['name'];
    let id = trip['id'];
    let cssId = `single-trip-${id}`;
    const Url = `https://trektravel.herokuapp.com/trips/${id}`
    tripList += `<li><a id=${cssId} href="${Url}">${name}</a></li>`;
  });
  tripList += '</ul></section>';
  $('#main-content').replaceWith(tripList);
};
const GetOneTrip = (response) => {
  let tripInfo = ''
  tripInfo += '<section id="main-content">'
  ;
  let tripTitle = `<h1>${response['name']}</h1>`;
  let tripId = `<p>ID: ${response['id']}</p>`;
  let tripDestination = `<p>Continent: ${response['continent']}</p>`;
  let tripDescription = `<p>Description: ${response['about']}</p>`;
  let tripDuration = `<p>Duration: ${response['weeks']} weeks</p>`;
  let tripCost = `<p>Cost: $${response['cost']}</p>`;
  let tripTags = `<p>Tags: ${response['category']}</p>`;
  tripInfo += `${tripTitle}${tripId}${tripDestination}${tripDescription}${tripDuration}${tripCost}${tripTags}</section>`;
  $('#main-content').replaceWith(tripInfo);
  $('#reserve-trip').removeClass('hide');
  $('#reserve-trip form').append(`<input type="hidden" id=trip_id name="trip_id" value=${response['id']}>`);

  $('#reserve-trip form').submit(function(event) {
    event.preventDefault();
    const url = `https://trektravel.herokuapp.com/trips/${response['id']}/reservations`;
    const formData = $(this).serialize();
    $.post(url, formData, (response) => {
      $('#main-content').append('<p> Reservation confirmed! </p>');
    }).fail(() => {
      $('#main-content').append('<p>Reservation Failed</p>');
    });
  });

};
$(document).ready(() => {
  $('button').on('click', () => {
    $.get('https://trektravel.herokuapp.com/trips', GetAllTrips);
  });
  $('body').on('click', 'ul', (event) => {
    event.preventDefault(event);
    let OTUrl = '';
    OTUrl += event['target']['href'];
    $.get(OTUrl, GetOneTrip);
  });

});
