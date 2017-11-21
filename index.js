// click to see all the trips
$(document).ready(function () {
  // load all of the trips
  $('#get-trips').on('click', () => {
    // make api request to get all of the names of the trips
    $.get('https://trektravel.herokuapp.com/trips', function(data) {
      // iterate though the api resonse and add all the trip names as HTML h5 to the page
      for(i = 0; i < data.length; i++) {
        let id = data[i]["id"];
        let name = data[i]["name"];


        let tripHTML = $('<article>' + `<h3 class="${id}">` + name + '</h3>' +
          '</article>');

        $('#all-trips').append(tripHTML);

        // create click event for each trip name
        tripHTML.click((event) => {

          let url =  'https://trektravel.herokuapp.com/trips/' + id

          // make the api request to get the details for the trip
          $.get(url, function(event) {
            let continent = event["continent"];
            let weeks = event["weeks"];
            let about = event["about"];
            let category = event["category"];
            let cost = event["cost"];

            let tripDetails = $(
            '<ul>' +
            '<li>' + 'ID: ' + id + '</li>' +
            '<li>' + 'Trip details: ' + about + '</li>' +
            '<li>' + 'Continent: ' + continent + '</li>' +
            '<li>' + 'Category: ' + category + '</li>' +
            '<li>' + 'Number of weeks: ' + weeks + '</li>' +
            '<li>' + 'Cost: ' + cost + '</li>' +
            '</ul>' );

            // append the trip details to the trip name
            // $(`.${name}`).html('change?');
            $(`.${id}`).append(tripDetails);

          })// .get for trip data
        }) // .click


      }; // for loop
    }); // .get
  });// .on for get-trips

}); // .ready


// '<ul>' +
// '<li>' + 'ID: ' + id + '</li>' +
// '<li>' + 'Continent: ' + continent + '</li>' +
// '<li>' + 'Number of weeks: ' + weeks + '</li>' +
// '</ul>' +
