// Wave 3: While viewing a single trip, you can reserve a spot
// Use a form to submit your name to reserve a spot on the trip you are viewing.

$(document).ready(() => {

  $('.tripView').hide();
  $('.reveal').hide();


  baseURL = 'https://trektravel.herokuapp.com/trips'

  let loadTrips = function loadTrips() {
    $.get(baseURL, (response) => {
      $('.trip-button').hide();
      response.forEach(function(trip) {
        let tripInfo = `<li class="small-12 large-12 columns"><h3 data-id=${trip.id}> ${trip.name}</li>`;

        $('.triplist ul').append(tripInfo);
        $('.reveal').hide();
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
      let tripInfo = `<section class="indTrip rows" id="${response.id}">
      <h2 class="large-8 text-center large-centered columns"> ${response.name} </h2>
      <p class="large-8 large-centered text-center columns"><strong> About:</strong> ${response.about} </p>
      <p class="large-6 text-center columns"> Continent: ${response.continent} </p>
      <p class="large-6 text-center columns"> Category: ${response.category} </p>
      <p class="large-6 text-center columns"> Week(s): ${response.weeks} </p>
      <p class="large-6 text-center columns"> Cost: $${response.cost} </p>
      </section>`;

      // let resButton = `<section class="res_modal"><p><button class="res_button small-12 small-centered large-12 large-centered text-center columns" data-open="reservation">Reserve a spot!</button></p></section>`

      $('.triplist ul').html("");
      $('.triplist').append(tripInfo);

      // $('.tripView').show();
      $('.reveal').show();
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  };

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

  // let reserveForm = function reserveForm() {
  //   let form = `<div class="reveal" id="reservation" data-reveal>
  //         <form method="post" id="makeReservation">
  //           <label for="name">Name</label>
  //           <input type="text" name="name"></input>
  //
  //           <label>Email</label>
  //           <input type="text" name="email"></input>
  //
  //           <input type="submit" value="Make Reservation"></input>
  //         </form>
  //         <button class="close-button" data-close aria-label="Close modal" type="button">
  //         </button>
  //       </div>`;
  //     $('.res_modal').append(form);
  // };

  // EVENTS

  $('.trip-button').on('click', function() {
    loadTrips();
  });


  $('.triplist ul').on('click', 'h3', function() {
    let tripID = $(this).attr('data-id');
    console.log(tripID);
    loadTrip(tripID);
  });

  // $('.res_button').on('click', function(){
  //   reserveForm();
  // });

  $('#makeReservation').on('submit', function(event){
    // this helps not to refresh the page
    event.preventDefault();
    tripID = $(`.indTrip`).attr('id');

    // this is a jQuery function that will take our form and turn it into query params
    let formData = $('#makeReservation').serialize();
    reserveTrip(tripID, formData);
  });

}); // document.ready end
