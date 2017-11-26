
const baseURL = 'https://trektravel.herokuapp.com/trips';
// https://trektravel.herokuapp.com/trips/1/reservations

const successCallback = (response) => {
  console.log('success!!!!!');
};


$(document).ready( () => {

  $('#book-trip-form').hide();

  let loadTrips = function loadTrips() {
    // $.get('https://trektravel.herokuapp.com/trips', (response) => {
    $.get(baseURL, (response) => {
      $('#load').hide();

      response.forEach(function(trip)  {

        if (trip.id < 35) {
        let tripInfo = `<div class="column">

        <h3 class="card" data-id=${trip.id}>

         ${trip.name}  </h3>

         </div>`


        $('#trips .row').append(tripInfo);
        }
      }); //for each

      //working version
      // response.forEach(function(trip)  {
      //   let tripInfo = `<li><h3 data-id=${trip.id}> ${trip.name} </a> </h3> </li>`
      //   $('#trips ul').append(tripInfo);
      // }); //for each

    })// get success response
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
    console.log("start detail function");
    console.log($(".trip-details"));
    console.log("end details");

    $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) => {
      let tripDetail = `
      <h2> ${response.name} </h2>
      <p> ${response.continent} </p>
      <p> ${response.about} </p>
      <p> ${response.weeks} weeks </p>
      <p> $ ${response.cost} </p>
      <p> ID: ${response.id} <p>
      <h3 data-id=${response.id}> Make a Reservation!</a> </h3>
      `;

      console.log("here in the trip detail function this is " + $(this));

      let tripId = response.id;
      console.log(`the trip id is ${tripId}`);
      //recognizes
      //how to tell it to use th eid?
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
    console.log(`here in the load trip function this is ${this}`);
    let tripID = $(this).attr('data-id');
    console.log(`and now tripid is ${tripID}`);
    loadDetail(tripID);
    window.scrollTo(0, 0);
  }) //

  // make reservations
  //show form
  $('.trip-details').on('click', 'h3', function() {
    console.log(`this is ${this}`);
    let tripID = $(this).attr('data-id');
    console.log(`and now tripid is ${tripID}`)

    $('#book-trip-info').text("Things I wrote in this paragraph");
    $('#book-trip-form').attr("data-id", tripID);
    $('#book-trip-form').show();
    //  // $( "#greatphoto" ).attr( "title", "Photo by Kelly Clark" ); $('#book-trip-form').text("hello!");
  })

  //make post request

  $('#book-trip-form').on('submit', function(event) {
    event.preventDefault();
    console.log(`this is ${this}`);
    let tripID = $(this).attr('data-id');


    console.log(`this is ${tripID}`);


    let formData = $('#book-trip-form').serialize();
    console.log("Showing the form data!")
    console.log(formData);
    // console.log(tripID);

    reserveTrip(tripID, formData);
  }) //end book trip

  }); //end doc ready
