$(document).ready(function () {
  // click to see all the trips
  $('#get-trips').on('click', () => {
    $.get('https://trektravel.herokuapp.com/trips', function (data) {
      // iterate though to add all the trips as h5 elements to the page, as well as a button to show the trip details.
      for(i = 0; i < data.length; i ++) {
        let id = data[i]["id"];
        let name = data[i]["name"];

        // create the jQuery object to add to the page. Give the button an ID equal to the trip id so that I can access that attribute to make an api call for the correct trip details
        let tripHTML = $('<article class="row">' + `<h3 large-9 column">` + name + '</h3>' + `<button id="${id}">Trip details</button>` + '</article>');

        // hide the 'see all trips' button
        $('#get-trips').hide()

        // append the trip names to the all-trips section
        $('#all-trips').append(tripHTML);
      } // for loop
    }) // .get to get all trips
  }); // .on to get all the trips
}); // .ready
