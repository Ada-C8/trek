
let getTrips = function getTrips() {
  const tripsURL = 'https://trektravel.herokuapp.com/trips';

  const successCallback = function(response) {
    console.log('success!');
    console.log(response);

    let tableRow = '<tr>'
    for (let trip of response) {
      for (let attr in trip) {
        tableRow += '<td>' + trip[attr] + '</td>';
      }
      tableRow += '</tr>'
    }
    $('.trips table').append(tableRow);
  }




$.get(tripsURL, successCallback);

} //end of getTrips



$(document).ready( function() {

  //get all trips on click of a button
  $('.trips').on('click', '#trips', function() {
    getTrips();
  });





}); //end of ready
