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
          const tripText = `<article class="trip-container large-8 medium-8 medium-centered large-centered columns">
                              <h2>${trip.name}</h2>
                              <p>Continent: ${trip.continent}</p>
                              <p>Weeks: ${trip.weeks}</p>
                              <button data-trip-id="${trip.id}" class="button view-trip-details-btn">More Information</button>
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
      const tripID = $(this).data('trip-id');
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
                               <button class="button make-reservation-btn">Make Reservation</button>`;
          tripDetailsContainer.html(detailsText);
          $(this).text('Hide Information');
        },
      );
    }
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
