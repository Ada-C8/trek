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
    );
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
      );
    }
  });

  // show form on click
  $('#results').on('click', '.make-reservation-btn', function callback() {
    //data to input then send: name, age, email

    const formContainer = $(this).parent().find('.reservation-form-container');
    console.log(formContainer);
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
  $('.reservation-form').submit((e) => {
    e.preventDefault(); //not working
    const url = $(this).attr('action');
    const formData = $(this).serialize();
    // const tripName = $(this).parent().parent().find('h2'); // didn't want to make another GET request
    $.post(url, formData, (response) => {
      $('#message').html('success!');
    }).fail(() => {
      $('#message').html('failed!');
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
      $('#site-title h2').html('S H R E K');
      buttonText.innerHTML = 'Exit The Swamp';
      $('body').css('background-image', "url('http://eskipaper.com/images/shrek-4.jpg')");
    }
  });
});
