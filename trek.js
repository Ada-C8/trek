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
      let tripInfo = `
      <h2> ${response.name} </h2>
      <p> id: ${response.id} </p>
      <p> Continent: ${response.continent} </p>
      <p> About: ${response.about} </p>
      <p> Category: ${response.category} </p>
      <p> Weeks: ${response.weeks} </p>
      <p> Cost: ${response.cost} </p>`;

      $('.triplist ul').html("");
      $('.tripView').html(tripInfo);

    })
    .fail(function(response){
    console.log(response);
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
  // console.log(`this is the data id ${tripID}`);
  // console.log(`this is the this ${this}`);
  loadTrip(tripID);
});

}); // document.ready end
