
const url = 'https://trektravel.herokuapp.com/trips';

const successCallback = (response) => {
  console.log('success');
}

$(document).ready(() => {

$.get(url, successCallback);






}); //end doc ready











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
