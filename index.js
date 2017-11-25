const tripsURL = 'https://trektravel.herokuapp.com/trips';

let getTrips = function getTrips() {

  const successCallback = function(response) {
    console.log('success!');
    console.log(response);
    console.log(response[0]);

    let back = '<button class="button white-text float-right">Go back</button>';

    let tableHead = '<tr>';
    for (let attr in response[0]) {
      tableHead += '<th>' + attr.toUpperCase() + '</th>';
    }
    tableHead += '</tr>'

    let tableRow = '';
    for (let trip of response) {
      tableRow += `<tr data-id=${trip.id}>`;
      for (let attr in trip) {
        tableRow += '<td>' + trip[attr] + '</td>';
      }
      tableRow += '</tr>';
    }
    $('.back').append(back);
    $('.trips table').append(tableHead);
    $('.trips table').append(tableRow);

    $('#trips').toggle();
  } // end of successCallback

  const failureCallback = function(response) {
    let generatedHTML = '<p>Something went wrong! Please try again!</p>';

    $('.trips').html(generatedHTML);
  }; // end of failureCallback

$.get(tripsURL, successCallback);


} // end of getTrips

let getTripBuilder = function(id) {
  let getTrip = function getTrip() {
    const successCallback = function(response) {
      console.log('success!');

      // let listItem = '';
      // for (let attr in response) {
      //   listItem += '<li>' + attr + ': ' + response[attr] + '</li>';
      // }
      let listItem = '';
      listItem += '<li><h3>' + response.name + '</h3></li>';
      listItem += '<li><strong>Continent: </strong>' + response.continent + '</li>';
      listItem += '<li><strong>About: </strong>' + response.about + '</li>';
      listItem += '<li><strong>Category: </strong>' + response.category + '</li>';
      listItem += '<li><strong>Duration in weeks: </strong>' + response.weeks + '</li>';
      listItem += '<li><strong>Cost: </strong>$' + response.cost + '</li>';


      // make reservation
      let reservationForm =
      `<form data-id=${id}>

        <div class="input-form">
          <label for="name"><strong>Name: </strong></label>
          <input type="text" name="name"></input>
        </div>

        <div class="input-form">
          <label for="age"><strong>Age: </strong></label>
          <input type="number" name="age"></input>
        </div>

        <div class="input-form">
          <label for="email"><strong>Email: </strong></label>
          <input type="text" name="email"></input>
        </div>

        <input id="submit" class="button blue white-text" type="submit" value="Reserve a trip"></input>

      </form>`

      // what would be displayed
      $('.wrapper').toggle();
      $('#trip').html(listItem);
      $('#reservation').html(reservationForm);


    } //end of successCallback

    const failureCallback = function(response) {
      let generatedHTML = '<p><strong>Something went wrong! Please try again!</strong></p>';

      $('.trip').html(generatedHTML);
    }; // end of failureCallback

    $.get(tripsURL + `/${id}`, successCallback).fail(failureCallback);

  } // end of getTrip
  getTrip();
} // end of getTripBuilder

let makeReservation = function makeReservation(id) {

  const successCallback = function(response) {
    console.log('POST -> success!');
    console.log(response);

    let generatedHTML = '<p><strong>Everything went well! Thank you for your reservation!</strong></p>';

    $('#reservation').html(generatedHTML);

  } // end of successCallback

  const failureCallback = function(response) {
    let generatedHTML = '<p>Something went wrong! Please try again!</p>';

    $('#reservation').html(generatedHTML);
  }; // end of failureCallback

  let reservationData = $('#reservation form').serialize();
  let reservationURL = tripsURL + `/${id}` + '/reservations';
  $.post(reservationURL, reservationData, successCallback).fail(failureCallback);

} // end of makeReservation


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

  //make reservation
  $('.trip').on('submit', '#reservation form', function(event) {
    event.preventDefault();
    let tripID = $(this).attr('data-id');
    makeReservation(tripID);
  });

  //close trip info
  $('.wrapper').on('click', '#close', function() {
    $('.wrapper').hide();
  })

  //go back from trips table
  $('body').on('click', '.back, #title', function() {
    $('.trips table').html('');
    $('.back').html('');
    $('#trips').toggle();
  })

  //footer
  // $('body').append('<footer class="text-center white-text"><p>COPYRIGHT &copy; Iuliia Chikulaeva</p></footer>');





}); //end of ready
