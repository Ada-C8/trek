$(document).ready(function () {
  // method to call in the click event to see trip details
  const getTripDetails = function getTripDetails(tripId) {
    let url = 'https://trektravel.herokuapp.com/trips/' + tripId;
    $.get(url, (data) => {
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
      `<button class="${tripId} book">Book this trip</button>`);
      $(`#${tripId}`).parent().append(tripDetails);
    }) // .get for trip details

    console.log('right before the .on for the book trip');
    $(`#all-trips`).on('click', 'button:not(.details)', (event) => {
        alert('in the click event for the form!')
        // stops the tripHTML click event from running
        console.log('inside the click event to get the form!');
        event.stopPropagation();
        // TODO: GET THE GETFORM FUNCTION TO RUN!

        getForm(`$(event.target).attr('id')`);
        debugger
        // hide the book trip button
        $(`#trip${id}`).hide();
    }) // .click to show form
  } // getTripData

  const getForm = function getForm(id) {

    console.log('in the getForm function');
    // replace the button with the form to book a trip when the button is clicked
    let idToBook = id;
    let action = 'https://trektravel.herokuapp.com/trips/' + `${idToBook}` +  '/reservations';

    let form = $(
      `<div id="book">
       <form action="${action}" method="post" id="book${id}">
        <label for="name">Name:</label>
        <input type="text" name="name"></input>

        <label name="age">Age:</label>
        <input type="text" name="age"></input>

        <label for="email">Email:</label>
        <input type="text" name="email"></input>

        <input type="hidden" id="trip_id" name="trip_id" value="${id}">

        <input type="submit" value="Book this trip!" class="button"></input>`
    );

    $(`.${id}`).parent().append(form)

  } // getForm

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
        tripHTML.on('click', '.details', (event) => {
          let tripId = $(event.target).attr('id');
          getTripDetails(tripId);
          // I never get out of this... maybe I need to move the click function for the form in here? I'm confused!
        }); // .on to get trip details

        // click event to get form to show up
        console.log('right before the .on for the book trip');
        $(`.book`).on('click', (event) => {
            alert('in the click event for the form!')
            // stops the tripHTML click event from running
            console.log('inside the click event to get the form!');
            event.stopPropagation();
            // TODO: GET THE GETFORM FUNCTION TO RUN!

            getForm(`$(event.target).attr('id')`);
            // hide the book trip button
            $(`#trip${id}`).hide();
        }) // .click to show form
      } // for loop
    }) // .get to get all trips
  }); // .on to get all the trips
}); // .ready
