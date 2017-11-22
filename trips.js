
const url = 'https://trektravel.herokuapp.com/trips';

// const successCallback = (response) => {
//   console.log('success');
// }

$(document).ready(() => {

let loadTrips = function loadTrips() {

  $.get('https://trektravel.herokuapp.com/trips', (response) => {
    response.forEach(function(trip)  {
      let tripInfo = `<li><button class="button"><h3 data-id=${trip.id}> ${trip.name} </a></h3></button></li>`

      $('#trips ul').append(tripInfo);
    }); //for each

  });// get success response

} //loadtrips function

let loadDetail = function loadDetail(id) {
  $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) => {
    let tripDetail = `
      <h2> ${response.name} </h2>
      <p> ${response.continent} </p>
      <p> ${response.about} </p>
      <p> ${response.weeks} </p>
      <p> ${response.cost} </p> `;

      $('li').after(tripDetail);
    // $('h3').after(tripDetail); //works
  }); //get trip function

} //trip detail function

$('#trips ul').on('click', 'h3', function () {
  let tripID = $(this).attr('data-id');
  loadDetail(tripID);
}) //


$('#load').on('click', function() {
  loadTrips();
});


}); //end doc ready

// $(document).ready(function() {
//   $('button').on('click', function() {
//     var message = $('<span>Call 1-555-jquery-air to book this tour</span>');
//     $(this).after(message); //puts it after whatever button is clicked.
//     // $('.usa').append(message); //appends it only on this one trip
//     $(this).remove(); //will only remove 'this' button, the one clicked on.
//     // $('button').remove(); //will remove all buttons when a button is clicked
//   });
// });



//
// $.get(url, successCallback);
//

















//
// let loadPets = afunction loadPets() {
//   $.get('https://petdibs.herokuapp.com/pets',
//     (response) => {
//
//       response.forEach(function(pet) {
//         let petInfo = `<li><h3 data-id=${pet.id}>
//         ${pet.name} </a></h3>
//         <p> ${pet.age}, ${pet.breed}</li>`
//
//         $('#pets ul').append(petInfo);
//       }); //gend tet request
//
//     }) //end load pets function
//     .fail(function(response){
//         console.log(response);
//         $('#fail').html('<p>Request was unsuccessful</p>')
//       })
//       .always(function(){
//         console.log('always even if we have success or failure');
//       });
// };
