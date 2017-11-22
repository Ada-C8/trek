const tripsURL = 'https://trektravel.herokuapp.com/trips';

let getTrips = function getTrips() {

  const successCallback = function(response) {
    console.log('success!');
    console.log(response);

    let tableRow = '';
    for (let trip of response) {
      tableRow += `<tr data-id=${trip.id}>`;
      for (let attr in trip) {
        tableRow += '<td>' + trip[attr] + '</td>';
      }
      tableRow += '</tr>';
    }
    $('.trips table').append(tableRow);
  }

$.get(tripsURL, successCallback);

} // end of getTrips

let getTripBuilder = function(id) {
  let getTrip = function getTrip() {
    const successCallback = function(response) {
      console.log('success!');

      let listItem = '';
      for (let attr in response) {
        listItem += '<li>' + attr + ': ' + response[attr] + '</li>';
      }
      // what would be displayed
      $('#trip').html(listItem);
      // make reservation
      let reservationForm =
      `<form id="reservation">

        <label for="name">Name: </label>
        <input type="text" name="name"></input>

        <label for="age">Age: </label>
        <input type="number" name="age"></input>

        <label for="email">Email: </label>
        <input type="text" name="email"></input>

        <input type="submit" value="Reserve a trip"></input>

      </form>`

      $('#trip').append(reservationForm);

    } //end of successCallback

    $.get(tripsURL + `/${id}`, successCallback);

  } // end of getTrip
  getTrip();
}



$(document).ready( function() {

  //get all trips on click of a button
  $('.trips').on('click', '#trips', function() {
    getTrips();
  });

  //get info for specific trip
  $('.trips').on('click', 'table tr', function() {
    let tripID = $(this).attr('data-id');
    getTripBuilder(tripID);
    console.log(tripID);
  });





}); //end of ready
