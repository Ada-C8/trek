$(document).ready(() => {
  $('#load-trips').on('click', () => {
    $.get(
      'https://trektravel.herokuapp.com/trips',
      (response) => {
        $('#display').html('');
        for (let i = 0; i < response.length; i += 1) {
          const trip = response[i];
          const weeks = trip.weeks === 1 ? 'week' : 'weeks';
          const tripHTML = `<li><h3><a class='trip' id='${trip.id}' href="#">${trip.name}</a></h3><ul><li>${trip.continent}</li><li>${trip.weeks} ${weeks}</li></ul></li>`;
          $('#display').append(tripHTML);
        }
      },
    );
  });
  $('body').on('click', '.trip', (event) => {
    const id = event.target.id;
    $.get(
      `https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        const tripHTML = `<h3>${response.name}</h3><a id='reserve' href='#'>Reserve</a><h4>Details</h4><ul><li>ID: ${response.id}</li><li>Continent: ${response.continent}</li><li>About: ${response.about}</li><li>Category: ${response.category}</li><li>Weeks: ${response.weeks}</li><li>Cost: ${response.cost}</li></ul>`;
        $('#display').html(tripHTML);
      },
    );
  });
});
