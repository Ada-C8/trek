$(document).ready(()=>{

  console.log('we are inside');
  //$('#trips').append('<h3>A list of trips should go here.</h3>')

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  let loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {

      response.forEach(function(trip) {
        let tripInfo =
        `<li>Trip #${trip.id} </li>
        <li> Name: ${trip.name}</li>
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

//EVENTS
  $('#load').on('click', function(){
     loadTrips();
   });


});
