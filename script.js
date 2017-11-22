// /* eslint-disable */

$(document).ready(() => {

  $('#all-trips-btn').on('click', () => {
    const url = 'https://trektravel.herokuapp.com/trips';
    $.get(
      url,
      (response) => {
        const resultsContainer = $('#results');
        let allTrips = '';
        response.forEach((trip) => {
          // id, name, continent, weeks
          const tripText = `<article class="trip-container">
                            <h2>${trip.name}</h2>
                            <p>${trip.continent}</p>
                            <p>${trip.weeks}</p>
                          </article>`;
          allTrips += tripText;
        });
        resultsContainer.html(allTrips);
      },
    );
  });
});
