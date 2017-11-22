$(document).ready(() => {
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips/', (response) => {
      console.log('success!');

      response.forEach((trip) => {
        const tripInfo = $(`<article data-id=${trip.id} data-name=${trip.name} data-continent=${trip.continent} data-weeks=${trip.weeks}>
          <ul class="details">
            <li>${trip.name}</li>
            <button class="trip-details">View Trip Details</button>
          </ul>
        </article>`);

        $('#trips').append(tripInfo);

        // moving this inside of the first each loop so that we have access to the ID so we can pass it to the loadDetails function.
        tripInfo.find('.trip-details').on('click', () => {
          console.log('WORKING?????');
          loadDetails(trip.id);
        });

        const loadDetails = function loadDetails(id) {
          $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) => {
          // console.log('IT WORKED');
          // console.log(response);
            let addInfo = `<li>${response.continent}</li>
              <li>${response.about}</li>
              <li>${response.weeks}</li>
              <li>${response.category}</li>
              <li>${response.cost}</li>
              <button>Reserve Spot</button>`;

            $(`[data-id="${id}"] .details`).append(addInfo);
            $(`[data-id="${id}"] .trip-details`).remove();
          });
        };
      });
    });
  }

  $('#load').on('click', () => {
    $('#trips').empty();
    loadTrips();
  });
});
