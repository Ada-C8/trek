// /* eslint-disable */
$(document).ready(() => {
  // AJAX REQUEST TO TRIP API HANDLERS
  // view all trips on click;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  $('#all-trips-btn').on('click', () => {
    const url = 'https://trektravel.herokuapp.com/trips';
    $.get(
      url,
      (response) => {
        const resultsContainer = $('#results');
        let allTrips = '';
        response.forEach((trip) => {
          // id, name, continent, weeks
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
      },
    ).fail(() => {
      const message = `<h3>Unable to generate all trips.</h3>`;
      $('#message').html(message);
      $('#message').css('padding', '30px');
      $('#message').show().delay(2000).fadeOut('slow');
    });
  });

  // view trip details on click
  $('#results').on('click', 'button.view-trip-details-btn', function callback() {
    // id, name, about, continent, category, weeks, cost
    const tripDetailsContainer = $(this).next();
    // if toggled is true
    if (tripDetailsContainer.data('toggled') === 'true') {
      // hide details
      tripDetailsContainer.data('toggled', 'false');
      tripDetailsContainer.html('');
      $(this).text('More Information');
    } else { // if toggled is false
      const tripID = $(this).parent().data('trip-id');
      const url = `https://trektravel.herokuapp.com/trips/${tripID}`;
      // show details
      $.get(
        url,
        (response) => {
          tripDetailsContainer.data('toggled', 'true');
          const detailsText = `<h3>Details:</h3>
                               <p>Category: ${response.category}</p>
                               <p>Cost: $${response.cost}</p>
                               <p>About: ${response.about}</p>
                               <button class="button make-reservation-btn">Make Reservation</button>
                               <section class="reservation-form-container">`;
          tripDetailsContainer.html(detailsText);
          $(this).text('Hide Information');
        },
      ).fail(() => {
        const message = `<h3>Unable to get details for trip ID ${tripID}</h3>`;
        $('#message').html(message);
        $('#message').css('padding', '30px');
        $('#message').show().delay(2000).fadeOut('slow');
      });
    }
  });

  // show form on click
  $('#results').on('click', '.make-reservation-btn', function callback() {
    // data to input then send: name, age, email
    const formContainer = $(this).parent().find('.reservation-form-container');
    const tripID = $(this).parent().parent().data('trip-id');
    const postURL = `https://trektravel.herokuapp.com/trips/${tripID}/reservations`;
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
      $('#message').html(message);
      $('#message').css('padding', '30px');
      $('#message').show().delay(2000).fadeOut('slow');
    }).fail(() => {
      const message = `<h3>Reservation for ${tripName} was unsuccessful.</h3>`;
      $('#message').html(message);
      $('#message').css('padding', '30px');
      $('#message').show().delay(2000).fadeOut('slow');
    });
  });

  // submit search form to API and filter out results
  // valid search request https://trektravel.herokuapp.com/trips/budget?query=5000&weeks?query=3&continent?query=Asia
  // no search request format available for: (trip)name, category

  $(document).on('submit', '#search-form', function callback(e) {
    e.preventDefault();
    const formData = $(this).serialize();
    // parse formData and build url parameters for budget, weeks, and continent...
    const formDataKeysAndValues = formData.split('&').map((resultString) => {
      return resultString.split('=');
    });
    const formDataMap = new Map(formDataKeysAndValues);
    console.log(formDataMap);
    const url = `https://trektravel.herokuapp.com/trips/budget?query=5000&weeks?query=3&continent?query=Asia`;

    //...and filter through results based on (trip) name and category
  });


  // NAVIGATION HANDLERS
  // Click to toggle search form
  $('#search-form-toggle').on('click', () => {
    $('#search-form-container').toggleClass('show');
  });


  // someBODY once told me memes were outdated
  $('#shrekify').on('click', () => {
    const buttonText = $('#shrekify')[0];
    if (buttonText.innerHTML.includes('Exit')) {
      $('#site-title h2').html('T R E K');
      buttonText.innerHTML = 'Visit The Swamp';
      $('body').css('background-image', 'none');
    } else {
      $('#site-title h2').html('S H R E K');
      buttonText.innerHTML = 'Exit The Swamp';
      $('body').css('background-image', "url('http://eskipaper.com/images/shrek-4.jpg')");
    }
  });
});
