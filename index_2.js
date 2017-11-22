$(document).ready(function () {
  // method to call in the click event to see trip details
  const getTripDetails = function getTripDetails(tripId) {
    console.log('Do i get here?')
    let url = 'https://trektravel.herokuapp.com/trips/' + tripId;
    debugger
    $.get(url, function(data) {
      let continent = data["continent"];
      let weeks = data["weeks"];
      let about = data["about"];
      let category = data["category"];
      let cost = data["cost"];

      let tripDetails = $(
      '<ul>' +
      '<li>' + 'ID: ' + tripId + '</li>' +
      '<li>' + 'Continent: ' + continent + '</li>' +
      '<li>' + 'Category: ' + category + '</li>' +
      '<li>' + 'Number of weeks: ' + weeks + '</li>' +
      '<li>' + 'Cost: $' + cost + '</li>' +
      '</ul>' +
      '<p>' + 'Trip details: ' + about + '</p>' +
      `<button class="${tripId}">Book this trip</button>`);
      $(`#${tripId}`).parent().append(tripDetails);
    }) // .get for trip details
  }

  // click to see all the trips
  $('#get-trips').on('click', () => {
    $.get('https://trektravel.herokuapp.com/trips', function (data) {
      // iterate though to add all the trips as h5 elements to the page, as well as a button to show the trip details.
      for(i = 0; i < data.length; i ++) {
        let id = data[i]["id"];
        let name = data[i]["name"];

        // create the jQuery object to add to the page. Give the button an ID equal to the trip id so that I can access that attribute to make an api call for the correct trip details
        let tripHTML = $('<article class="row article">' + `<h3 large-9 column">` + name + '</h3>' + `<button id="${id}" class="details">Trip details</button>` + '</article>');

        // hide the 'see all trips' button
        $('#get-trips').hide()

        // append the trip names to the all-trips section
        $('#all-trips').append(tripHTML);

        // create click event for each trip name
        tripHTML.on('click', 'button', (event) => {
          let tripId = $(event.target).attr('id');
          console.log(tripId);
          getTripDetails(tripId);
        }) // .on to get trip details
      } // for loop
    }) // .get to get all trips
  }); // .on to get all the trips



}); // .ready
