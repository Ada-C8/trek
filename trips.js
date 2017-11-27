
const baseURL = 'https://trektravel.herokuapp.com/trips';


$(document).ready( () => {

  $('#book-trip-form').hide();

  let loadTrips = function loadTrips() {
    $.get(baseURL, (response) => {
      response.forEach(function(trip)  {
        if (trip.id < 35) {
          let tripInfo = `<div class="column">
          <h3 class="card" data-id=${trip.id}>
          ${trip.name}</h3></div>`
          $('#trips .row').append(tripInfo);
        }
      }); //for each
    })
    .fail(function(response) {
      console.log(response);
      $('#fail').html('<p>Your Request was Unsuccessful</p>')
    })
    .always(function(){
      console.log("always and forever");
    });
  }; //loadtrips function

  let loadDetail = function loadDetail(id) {
    $('.trip-details').children().hide();

    $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) => {
      let tripDetail = `
      <h2> ${response.name} </h2>
      <p id="weeks"> ${response.weeks} weeks in ${response.continent} for $${response.cost} </p>
      <p> ${response.about} </p>
      <h4 class="reservation button" data-id=${response.id}> Make a Reservation!</h4>
      `;

      let tripId = response.id;
      $('.trip-details').prepend(tripDetail);

    }) //get trip function
    .fail(function(response) {
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    })
    .always(function() {
      console.log('always on my mind');
    });
  }; //trip detail function

  let reserveTrip = function reserveTrip(id, formData) {
    reserveURL = (baseURL+'/'+ id + '/reservations');
    console.log(reserveURL);
    $.post(reserveURL, formData, (response) => {
      $('#makeReservation').html('<p> Reservation added! </p>');
      console.log(response);
      alert("Your Trip is Reserved!");
      $('#book-trip-form').hide();
      $('.trip-details').children().hide();
    })
    .fail(function(response){
      $('#fail').html('<p>Request was unsuccessful</p>')
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  };

  // EVENTS


  //load all trips
  $('#load').on('click', function() {
    loadTrips();
  });

  //load trip detail
  $('#trips .row').on('click', 'h3', function () {
    let tripID = $(this).attr('data-id');
    loadDetail(tripID);
    window.scrollTo(0, 0);
  }) //

  // make reservations
  $('.trip-details').on('click', 'h4', function() {
    let tripID = $(this).attr('data-id');
    $('#book-trip-form').attr("data-id", tripID);
    $('#book-trip-form').show();
  })

  $('#book-trip-form').on('submit', function(event) {
    event.preventDefault();
    let tripID = $(this).attr('data-id');
    let formData = $('#book-trip-form').serialize();
    reserveTrip(tripID, formData);
  }) //end book trip

}); //end doc ready






//working version
// response.forEach(function(trip)  {
//   let tripInfo = `<li><h3 data-id=${trip.id}> ${trip.name} </a> </h3> </li>`
//   $('#trips ul').append(tripInfo);
// }); //for each
