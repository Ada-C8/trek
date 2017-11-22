
$(document).ready(function () {
  // click to see all the trips
  $('#get-trips').on('click', () => {
    // make api request to get all of the names of the trips
    $.get('https://trektravel.herokuapp.com/trips', function(data) {
      // iterate though the api resonse and add all the trip names as HTML h5 to the page
      for(i = 0; i < data.length; i++) {
        let id = data[i]["id"];
        let name = data[i]["name"];

        // make a jQuery object from the api response
        let tripHTML = $('<article class="row">' + `<h3 class="${id} large-9 column">` + name + '</h3>' + `<button id="button${id}">Trip details</button>` + '</article>');
        // hide the 'see all trips' button
        $('#get-trips').hide()
        // append the trip names to the all-trips section
        $('#all-trips').append(tripHTML);

        // create click event for each trip name
        tripHTML.on('click', 'button', (event) => {

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
            '<li>' + 'Continent: ' + continent + '</li>' +
            '<li>' + 'Category: ' + category + '</li>' +
            '<li>' + 'Number of weeks: ' + weeks + '</li>' +
            '<li>' + 'Cost: $' + cost + '</li>' +
            '</ul>' +
            '<p>' + 'Trip details: ' + about + '</p>' +
            `<button id="trip${id}">Book this trip</button>`);

            // append the trip details to the trip name (above I added the 'id' as a class for the h5 containing each name)
            $(`.${id}`).parent().append(tripDetails);

            // create a click event for the button to book a trip
            $(`#trip${id}`).click((event) => {
              // stops the tripHTML click event from running
              event.stopPropagation();

              // replace the button with the form to book a trip when the button is clicked
              let form = $(
                `<div id="book">
                 <form action="https://trektravel.herokuapp.com/trips/1/reservations" method="post" id="book${id}">
                  <label for="name">Name:</label>
                  <input type="text" name="name"></input>

                  <label name="age">Age:</label>
                  <input type="text" name="age"></input>

                  <label for="email">Email:</label>
                  <input type="text" name="email"></input>

                  <input type="hidden" id="trip_id" name="trip_id" value="${id}">

                  <input type="submit" value="Book this trip!"></input>`
              );

              $(`#trip${id}`).hide();
              // append to the article using .parent()
              $(`.${id}`).parent().append(form)

              // submit for form
              $(`#book${id}`).submit( function (event) {
                // stop the page from reloading
                event.preventDefault();

                let url = $(this).attr('action');
                const formData = $(this).serialize();
                console.log(url, formData);

                $.post(url, formData, (response) => {
                  let tripName = $(`.${id}`).html();
                  debugger
                  let successMessage = `<p> You\'re all booked to go on the ${tripName} trip! </p>`
                  $(`#book${id}`).hide();
                  $(`.${id}`).parent().append(successMessage)
                }).fail( () => {
                  let failureMessage = `<p> Sorry, we failed to book you for the ${tripName} trip. </p>`
                  $(`.${id}`).parent().append(failureMessage)
                }) // .post
              }) // .on for submit
            }) // .click for button
          })// .get for trip data
        }) // .click
      }; // for loop
    }); // .get
  });// .on for get-trips
}); // .ready
