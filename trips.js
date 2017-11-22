
const url = 'https://trektravel.herokuapp.com/trips';

// const successCallback = (response) => {
//   console.log('success');
// }

$(document).ready(() => {

let loadTrips = function loadTrips() {

  $.get('https://trektravel.herokuapp.com/trips', (response) => {
    response.forEach(function(trip)  {
      let tripInfo = `<li> <button class="button"> <h3 data-id=${trip.id}> ${trip.name} </a> </h3> </button> </li>`

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
console.log(id);
console.log(typeof(id));
console.log($(this));
//recognizes
//how to tell it to use th eid?
      $('h3').first().after(tripDetail);
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
