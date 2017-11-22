const tripsURL = 'https://trektravel.herokuapp.com/trips';

let getTrips = function getTrips() {

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

} // end of getTrips

let getTripBuilder = function(id) {
  let getTrip = function getTrip() {
    const successCallback = function(response) {
      console.log('success!');
      // console.log(response);

      let listItem = '';
      for (let attr in response) {
        listItem += '<li>' + attr + ': ' + response[attr] + '</li>';
      }
      // console.log(listItem);
      $('#trip').append(listItem);
    }

    $.get(tripsURL + `/${id}`, successCallback);

  } // end of getTrip
  getTrip();
}



$(document).ready( function() {

  //get all trips on click of a button
  $('.trips').on('click', '#trips', function() {
    getTrips();
  });

  $('.trips').on('click', 'table tr', function() {
    getTripBuilder($('.trips table tr td:first-of-type').html());
    console.log($('.trips table tr td:first-of-type').html());
  });








}); //end of ready
