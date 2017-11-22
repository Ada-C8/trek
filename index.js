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
          <h2> ${response.name} </h2>
          <p> Continent: ${response.continent} </p>
          <p> Trip Duration: ${response.weeks} week(s)</p>
          <p> Trip Category: ${response.category} </p>
          <p> Cost: $${response.cost} </p>
          <p> Description: ${response.about} </p>
          `;

          $('#trip').html(indivTripInfo);
          $('#reservation-form').show()

        })
        .fail(function(response){
            console.log(response);
            $('#fail').html('<p>Request was unsuccessful</p>')
          })
          .always(function(){
            console.log('always even if we have success or failure');
          });

          //ADD A LINK TO A RESERVATION FORM HERE
          
    };


//CREATE FORM WHEN CLICK "RESERVE" BUTTON
  let showForm = function showForm(id) {

  };


//POST RESERVATION INFO (RECEIVE INFO FROM FORM)
  $('form').submit( function(e) {
    // By default, the form will attempt to do it's own
    // local POST so we want to prevent that default
    // behavior
    e.preventDefault();
    let form = document.createElement("form")
    console.log(`THIS: ${$(this)}`);
    const url = $(this).attr('action') + $(this).id + '/reservations'; // Retrieve the action from the form
    console.log(`URL: ${url}`);
    const formData = $(this).serialize();
    console.log(`fromData: ${formData}`)

    $.post(url, formData, (response) => {
      $('#message').html('<p> Reservation confirmed </p>');
      // What do we get in the response?
      console.log(response);
    });

    //document.body.removeChild(form)
  });

//EVENTS
  $('#load').on('click', function(){
     loadTrips();
   });

   $('#trips ul').on('click', 'h3', function(){
  let tripID = $(this).attr('trip-id');
  loadTrip(tripID);
});


});
