
$(document).ready(()=>{
  let loadTrips = function loadTrips (){
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach(function(trip) {
          let tripInfo = `<h3 data-id=${trip.id}> ${trip.name}</a></h3><p> `
          $('#trips').append(tripInfo);
        }); // forEach
      }) // .get, response
      .fail(function(response){
          console.log(response);
          $('#fail').html('<p>Request was unsuccessful</p>')
        }); // .fail
  } // loadTrip



// Function for AJAX request for a specific trip

let loadTrip = function loadTrip(id) {
  $.get(`https://trektravel.herokuapp.com/trips/${id}`,
  (response) => {
    let tripInfo = `
    <h2> ${response.name} </h2>
    <p><b> Continent: </b>${response.continent}</p>
    <p> <b> About: </b>${response.about}</p>
    <p> <b> Category: </b> ${response.category}</p>
    <p> <b> Weeks: </b>${response.weeks}</p>
    <p> <b> Cost: </b>${response.cost}</p>`;

    $('#trip').html(tripInfo)
  })

  .fail(function(response) {
    console.log(response);
    $('#fail').html('<p> Request failed </p>')
  });
};


// Events

$('#trips').on('click', 'h3', function(){
  let tripID = $(this).attr('data-id');
  loadTrip(tripID);
});

$('#load').on('click', function(){
  loadTrips();
});
}); //.ready
