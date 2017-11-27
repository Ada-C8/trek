// /* eslint-disable */
$(document).ready(() => {
  // AJAX REQUEST TO TRIP API HANDLERS
  // view all trips on click
  const BASE_URL = 'https://trektravel.herokuapp.com/trips/';
  const showMessage = function showMessage(message) {
    $('#message').html(message);
    $('#message').css('padding', '30px');
    $('#message').show().delay(4000).fadeOut('slow');
  };

  $('#all-trips-btn').on('click', () => {
    const url = BASE_URL;
    $.get(url, (response) => {
      const resultsContainer = $('#results');
      let allTrips = '';
      response.forEach((trip) => {
        const tripText = `<article data-trip-id="${trip.id}" class="trip-container large-8 medium-8 small-10 small-centered medium-centered large-centered columns">
                            <h2>${trip.name}</h2>
                            <p>Continent: ${trip.continent}</p>
                            <p>Weeks: ${trip.weeks}</p>
                            <button class="button view-trip-details-btn">More Information</button>
                            <section data-toggled="false" class="trip-details"></section>
                          </article>`;
        allTrips += tripText;
      });
      resultsContainer.html(allTrips);
    }).fail(() => {
      const message = '<h3>Unable to generate all trips.</h3>';
      showMessage(message);
    });
  });

  // view trip details on click
  $('#results').on('click', 'button.view-trip-details-btn', function callback() {
    const tripDetailsContainer = $(this).next();
    if (tripDetailsContainer.data('toggled') === 'true') {
      tripDetailsContainer.data('toggled', 'false');
      tripDetailsContainer.html('');
      $(this).text('More Information');
    } else {
      const tripID = $(this).parent().data('trip-id');
      const url = `${BASE_URL}${tripID}`;
      $.get(url, (response) => {
        if (response) {
          tripDetailsContainer.data('toggled', 'true');
          const detailsText = `<h3>Details:</h3>
                               <p>Category: ${response.category}</p>
                               <p>Cost: $${response.cost}</p>
                               <p>About: ${response.about}</p>
                               <button class="button make-reservation-btn">Make Reservation</button>
                               <section class="reservation-form-container">`;
          tripDetailsContainer.html(detailsText);
          $(this).text('Hide Information');
        }
      }).fail(() => {
        const message = `<h3>Unable to get details for trip ID ${tripID}</h3>`;
        showMessage(message);
      });
    }
  });

  // show form on click
  $('#results').on('click', '.make-reservation-btn', function callback() {
    // data to input then send: name, age, email
    const formContainer = $(this).parent().find('.reservation-form-container');
    const tripID = $(this).parent().parent().data('trip-id');
    const postURL = `${BASE_URL}${tripID}/reservations`;
    const formHTML = `<form action="${postURL}" method="post" class="reservation-form">
                        <h4>Reservation Form:</h4>
                        <section class="row">
                          <section class="large-6 columns">
                            <label for="name">
                              Name:
                              <input type="text" id="name" name="name" placeholder="Name" required />
                            </label>
                          </section>
                          <section class="large-6 columns">
                            <label for="email">
                              E-mail:
                              <input type="text" id="email" name="email" placeholder="Email" pattern="\\S+@\\S+\\.\\S+" title="ex. name@example.com" required />
                            </label>
                          </section>
                          <section class="large-6 large-centered medium-6 medium-centered columns">
                            <button type="submit" class="button form-submit-btn">Submit</button>
                          </section>
                        </section>
                      </form>`;
    formContainer.html(formHTML);
  });

  // submit reservation form to API and display success message that eventually disappears
  $(document).on('submit', '.reservation-form', function callback(e) {
    e.preventDefault();
    const url = $(this).attr('action');
    const formData = $(this).serialize();
    const tripName = $(this).parent().parent().parent()
      .find('h2')
      .text(); // didn't want to do another GET request to just get title
    $.post(url, formData, (response) => {
      const message = `<h3>Successfully created a reservation for ${tripName}.</h3>
                       <h4>Reservation Summary:</h4>
                       <p>Name: ${response.name}</p>
                       <p>Email: ${response.email}</p>`;
      showMessage(message);
    }).fail(() => {
      const message = `<h3>Reservation for ${tripName} was unsuccessful.</h3>`;
      showMessage(message);
    });
  });

  // submit search form to API and filter out results
  // valid search request https://trektravel.herokuapp.com/trips/budget?query=5000&weeks?query=3&continent?query=Asia
  // no search request format available for: (trip)name, category
  $(document).on('submit', '#search-form', function callback(e) {
    e.preventDefault();
    const formData = $(this).serialize();
    // parse serialized formData and build url parameters for budget, weeks, and continent...
    let formDataKeysAndValues = formData.split('&').map((resultString) => {
      return resultString.split('=');
    });
    formDataKeysAndValues = formDataKeysAndValues.reduce((objKeyValuePair, subArray) => {
      objKeyValuePair[subArray[0]] = subArray[1];
      return objKeyValuePair;
    }, {});
    let url = BASE_URL;
    const parameters = [];
    // since API can only take budget, weeks, and continent as query, leave (trip)name out for now
    // ignore queries unfilled by user
    Object.keys(formDataKeysAndValues).forEach((key) => {
      if (key !== 'trip-name' && formDataKeysAndValues[key] !== '') {
        parameters.push(`${key}?query=${formDataKeysAndValues[key]}`);
      }
    });
    url += parameters.join('&');
    $.get(url, (response) => {
      const resultsContainer = $('#results');
      let allTrips = '';
      if (response) {
        response.forEach((trip) => {
          // check if the user's (trip)name query is a part of the trip's name
          if (trip.name && trip.name.toLowerCase().includes(formDataKeysAndValues['trip-name'].toLowerCase())) {
            const tripText = `<article data-trip-id="${trip.id}" class="trip-container large-8 medium-8 small-10 small-centered medium-centered large-centered columns">
                                <h2>${trip.name}</h2>
                                <p>Continent: ${trip.continent}</p>
                                <p>Weeks: ${trip.weeks}</p>
                                <button class="button view-trip-details-btn">More Information</button>
                                <section data-toggled="false" class="trip-details"></section>
                              </article>`;
            allTrips += tripText;
          }
        });
      }
      resultsContainer.html(allTrips);
    }).fail(() => {
      const message = '<h3>Unable to generate all trips.</h3>';
      showMessage(message);
    });
  });

  // NAVIGATION HANDLERS
  // Click to toggle search form
  $('#search-form-toggle').on('click', () => {
    if ($('#search-form-container').data('toggled') === false) {
      $('#search-form-toggle').text('Hide Search Form');
      $('#search-form-container').data('toggled', true);
    } else {
      $('#search-form-toggle').text('Search For A Trip');
      $('#search-form-container').data('toggled', false);
    }
    $('#search-form-container').toggleClass('show');
  });

  // Code is like onions. It has layers.
  // Changes CSS into a good time
  $('#shrekify').on('click', () => {
    const buttonText = $('#shrekify');
    if ($('#shrekify').data('toggled') === true) {
      $('#site-title h2').text('T R E K');
      buttonText.text('Visit The Swamp');
      buttonText.data('toggled', false);
    } else {
      const shrekImage = '<a href="https://fontmeme.com/shrek-font/"><img src="assets/title.png" alt="shrek-font" border="0"></a>';
      $('#site-title h2').html(shrekImage);
      buttonText.text('Exit The Swamp');
      buttonText.data('toggled', true);
    }
    $('body').toggleClass('shrek');
  });
});
