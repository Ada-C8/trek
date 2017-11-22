$(document).ready(()=>{
  $('#reservation-form').hide();
  console.log('we are inside');
  //$('#trips').append('<h3>A list of trips should go here.</h3>')

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  let loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {

      response.forEach(function(trip) {
        let tripInfo =
        `<li><h3 trip-id=${trip.id}>Name: ${trip.name}</li>
        <li> Continent: ${trip.continent}</li>`;
        $('#trips ul').append(tripInfo);
        console.log('success!');
        console.log(trip);
      });
    })
        .fail(function(){
          console.log('failure');
        })
        .always(function(){
          console.log('always even if we have success or failure');
        });
  };

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR A SPECIFIC TRIP
    let loadTrip = function loadTrip(id){
      $.get(`https://trektravel.herokuapp.com/trips/${id}`,
        (response) => {
          console.log(response);
          let indivTripInfo = `
          <h2 id="trip-name" reservation-trip-id=${response.id}> ${response.name} </h2>
          <p> Continent: ${response.continent} </p>
          <p> Trip Duration: ${response.weeks} week(s)</p>
          <p> Trip Category: ${response.category} </p>
          <p> Cost: $${response.cost} </p>
          <p> Description: ${response.about} </p>
          <button id="reserve-button" reservation-trip-id=${response.id}> Make a Reservation </button>
          `;

          $('#trip').html(indivTripInfo);
          //

        })
        .fail(function(response){
            console.log(response);
            $('#fail').html('<p>Request was unsuccessful</p>')
          })
          .always(function(){
            console.log('always even if we have success or failure');
          });

    };


//CREATE FORM WHEN CLICK "RESERVE" BUTTON
  // let showForm = function showForm(id) {
  //
  // };
//



//POST RESERVATION INFO (RECEIVE INFO FROM FORM)
const submitReservation = function submitReservation() {
  $('form').submit( function(e) {
    e.preventDefault();
    let form = document.createElement("form")
    let tripID = $('#trip-name').attr('reservation-trip-id')
    const url = $(this).attr('action') + tripID + '/reservations'; // Retrieve the action from the form
    console.log(`URL: ${url}`);
    const personName = $(this);
    console.log(`person-name: ${personName}`);
    const formData = $(this).serialize();
    console.log(`fromData: ${formData}`)

    $.post(url, formData, (response) => {
      $('#message').html(`<p> Reservation confirmed for ${formData} </p>`);
      // What do we get in the response?
      console.log(response);
    });

    //document.body.removeChild(form)
  });
};

//EVENTS
  $('#load').on('click', function(){
    loadTrips();
  });

  $('#trips ul').on('click', 'h3', function(){
    let tripID = $(this).attr('trip-id');
    loadTrip(tripID);
  });

  //show reservation form button
  $('#trip').on('click','#reserve-button', function(){
    console.log('inside reservation form button');
    console.log($(this).attr('reservation-trip-id'));
    let tripID = $(this).attr('reservation-trip-id');
    $('#reservation-form').show()
    $('#reserve-button').hide();
  });

  //submit reservation button
  $('#reservation-form').on('click','#submit-reservation', function(){
    console.log('submitted reservation');
    submitReservation();
    $('#reservation-form').hide();
  });

});
