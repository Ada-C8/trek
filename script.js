// /* eslint-disable */
$(document).ready(() => {
  // view all trips on click
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
                            <label>
                              <input type="text" id="name" name="name" placeholder="Name" required />
                            </label>
                          </section>
                          <section class="large-6 columns">
                              <input type="text" id="email" name="email" placeholder="Email" pattern="\\S+@\\S+\\.\\S+" title="ex. name@example.com" required />
                            </label>
                          </section>
                          <section class="large-12 columns">
                            <button type="submit" class="button">Submit</button>
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
    }).fail(() => {
      const message = `<h3>Reservation for ${tripName} was unsuccessful.</h3>`;
      $('#message').html(message);
      $('#message').css('padding', '30px');
      $('#message').show().delay(2000).fadeOut('slow');
    });
  });

  // someBODY once told me memes were outdated
  $('#shrekify').on('click', () => {
    const buttonText = $('#shrekify')[0];
    if (buttonText.innerHTML.includes('Exit')) {
      $('#site-title h2').html('T R E K');
      buttonText.innerHTML = 'Visit The Swamp';
      $('body').css('background-image', 'none');
    } else {
      const shrekImage = '<a href="https://fontmeme.com/shrek-font/"><img src="https://fontmeme.com/permalink/171126/41e088cfebc3f66ae1927574b97b2ff1.png" alt="shrek-font" border="0"></a>';
      // $('#site-title h2').html('S H R E K');
      $('#site-title h2').html(shrekImage);
      buttonText.innerHTML = 'Exit The Swamp';
      $('body').css('background-image', "url('https://images.moviepilot.com/images/c_limit,q_auto:good,w_600/clr44ylwoniaf3plvgas/fall-in-love-with-shrek-again-with-these-9-fascinating-movie-facts-you-probably-didn-t-know.jpg')");
    }
  });
});
