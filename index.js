$(document).ready(()=>{

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

        })
        .fail(function(response){
            console.log(response);
            $('#fail').html('<p>Request was unsuccessful</p>')
          })
          .always(function(){
            console.log('always even if we have success or failure');
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


});
