const url = 'https://trektravel.herokuapp.com/trips';

const scrollUp = function scrollUp() {
  $('html, #wrapper').animate({ scrollTop: 0 }, 500);
};

const postSuccessCallback = function postSuccessCallback(response) {
  console.log('POST request was successful');
  console.log(response);

  let generatedHMTL = `<p>You have successfully reserved a spot as ${response.name} </p>`;
  $('.success').html(generatedHMTL).show().delay(1000).fadeOut();
  scrollUp();
};

const querySuccessCallback = function querySuccessCallback(response) {
  $('#show-trip').hide();
  let body = '';
  console.log(response);
  if (response) {
    response.forEach((trip) => {
      let tripInfo = `<tr><td data-id=${trip.id} class= 'id'>${trip.id}</td><td data-id=${trip.id} class= 'id'> ${trip.name}</td><td>${trip.continent}</td><td> ${trip.weeks}</td></tr>`;
      body += tripInfo;
    });
    $('.success').html('<p>Results for search.</p>').show().delay(1000).fadeOut();
  } else {
    $('.fail').html('<p>Could not find trips for this search.</p>').show().delay(1000).fadeOut();
  }
  $('#trips tbody').html(body);
  $('#trips').show();
  scrollUp();
};


$(document).ready(() => {
  let loadTrips = function loadTrips() {
    $.get(url,
      (response) => {
        $('#show-trip').hide();
        let body = '';
        console.log(response);
        response.forEach((trip) => {
          let tripInfo = `<tr><td  data-id=${trip.id} class= 'id'>${trip.id}</td><td data-id=${trip.id} class= 'id'>
          ${trip.name}</td><td>${trip.continent}</td><td> ${trip.weeks}</td></tr>`;
          body += tripInfo;
        });
        $('.success').html('<p>Succesfully loaded all trips.</p>').show().delay(1000).fadeOut();
        $('#trips tbody').html(body);
        $('#trips').show();
      },
    ).fail((response) => {
      console.log(response);
      $('.fail').html('<p>Could not load trips.</p>').show().delay(1000).fadeOut();
    });
    scrollUp();
  };

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR A SPECIFIC TRIP
  let loadTrip = function loadTrip(id) {
    $.get(`${url}/${id}`,
      (response) => {
        let tripInfo = `
        <h2> ${response.id}: ${response.name} </h2>
        <p> ${response.about} </p>
        <p> <strong>Continent:</strong> ${response.continent} </p>
        <p> <strong>Category: </strong>${response.category} </p>
        <p> <strong>Weeks: </strong>${response.weeks} </p>
        <p> <strong>Cost: </strong>$${parseFloat(response.cost).toFixed(2)} </p>`;

        $('#trip').html(tripInfo);
        $('#show-trip').show();

        scrollUp();
        $('#reserve-trip-form').attr('trip-id', `${response.id}`);

        console.log(response);
        $('.success').html('<p>Succesfully loaded trip information.</p>').show().delay(1000).fadeOut();
      },
    ).fail((response) => {
      console.log(response);
      $('#fail').html('<p>Could not load trip information.</p>').delay(1000).fadeOut();
    });
  };

  $('#load').on('click', () => loadTrips());

  $('#trips table').on('click', 'tr .id', function () {
    let tripID = $(this).attr('data-id');
    console.log(`this is the trip id${$(this).attr('data-id')}`);
    loadTrip(tripID);
  });


  $('#reserve-trip-form').on('submit', function (event) {
    event.preventDefault();

    let formData = $(this).serialize();
    console.log(formData);
    let tripId = $(this).attr('trip-id');

    $.post(`${url}/${tripId}/reservations`, formData, postSuccessCallback).fail((response) => {
      console.log('Post request was unsuccessful.');
      $('#fail').html('<p>Could not reserve trip.</p>').delay(1000).fadeOut();
    });
  });

  let query = function query(search, type) {
    $.get(`${url}/${type}?query=${search}`,
      querySuccessCallback,
    ).fail((response) => {
      console.log(response);
      $('.fail').html('<p>Could not load trips.</p>').show().delay(1000).fadeOut();
    });
  };

  $('#continent, #weeks, #budget').on('keypress', function (e) {
    if (e.which === 13) {
      let search = $(this).val();
      console.log(`this is the search type: ${this.id} and this is the search query: ${$(this).val()}`);
      query(search, `${this.id}`);
    }
  });
});
