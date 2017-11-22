// Wave 3: While viewing a single trip, you can reserve a spot
// Use a form to submit your name to reserve a spot on the trip you are viewing.

$(document).ready(() => {

  baseURL = 'https://trektravel.herokuapp.com/trips'

  let loadTrips = function loadTrips() {
    $.get(baseURL, (response) => {

      response.forEach(function(trip) {
        let tripInfo = `<li><h3 data-id=${trip.id}> ${trip.name}</li>`;

        $('.triplist ul').append(tripInfo);
      });
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  };


  let loadTrip = function loadTrip(id) {
    $.get((baseURL + '/' + id),
    (response) => {
      let tripInfo = `<section class= "indTrip" id="${response.id}">
      <h2> ${response.name} </h2>
      <p> id: ${response.id} </p>
      <p> Continent: ${response.continent} </p>
      <p> About: ${response.about} </p>
      <p> Category: ${response.category} </p>
      <p> Weeks: ${response.weeks} </p>
      <p> Cost: ${response.cost} </p>
      </section>`;

      $('.triplist ul').html("");
      $('.tripView').append(tripInfo);
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  };

  // for post
  // id: 3,
  // trip_id: 1,
  // name: "kimberley",
  // email: ""
  let reserveTrip = function reserveTrip(id, formData) {
    reserveURL = (baseURL+'/'+ id + '/reservations');
    console.log(reserveURL);
    $.post(reserveURL, formData, (response) => {
      $('#makeReservation').html('<p> Reservation added! </p>');
      console.log(response);
    })
    .fail(function(response){
      $('#fail').html('<p>Request was unsuccessful</p>')
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  };

  // EVENTS

  $('.triplist button').on('click', function() {
    loadTrips();
  });


  $('.triplist ul').on('click', 'h3', function() {
    let tripID = $(this).attr('data-id');
    loadTrip(tripID);
  });

  $('#makeReservation').on('submit', function(event){
    // this helps not to refresh the page
    event.preventDefault();
    tripID = $(`.indTrip`).attr('id');
    // console.log(`this is the value ${value}`);
    // tripID = 3
    // let tripID = $(event).prop('id');
    // console.log(`this is the ${tripID}`);

    // this is a jQuery function that will take our form and turn it into query params
    let formData = $('#makeReservation').serialize();
    reserveTrip(tripID, formData);
  })

}); // document.ready end
