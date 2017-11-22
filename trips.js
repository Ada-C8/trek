
const url = 'https://trektravel.herokuapp.com/trips';

// const successCallback = (response) => {
//   console.log('success');
// }

$(document).ready(() => {

let loadTrips = function loadTrips() {

  $.get('https://trektravel.herokuapp.com/trips', (response) => {
    response.forEach(function(trip)  {
      let tripInfo = `<li><h3 data-id=${trip.id}> ${trip.name} </a></h3></li>`

      $('#trips ul').append(tripInfo);
    }); //for each

  });// get response

} //loadtrips function

$('#load').on('click', function() {
  loadTrips();
});


}); //end doc ready





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
