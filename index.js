$(document).ready(() => {
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips/', (response) => {
      console.log('success!');

      response.forEach((trip) => {
        const tripInfo = $(`<article data-id=${trip.id} data-name=${trip.name}>
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

              <form action="https://trektravel.herokuapp.com/trips/${id}/reservations" method="post">
                <section>
                  <label>Name</label>
                  <input type="text" id="name" name="name"></input>
                </section>

                <section>
                  <label>Email</label>
                  <input type="text" id="email" name="email"></input>
                </section>

                <section class="button">
                  <button type="submit">Reserve Spot</button>
                </section>
              </form>`;

            $(`[data-id="${id}"] .details`).append(addInfo);
            $(`[data-id="${id}"] .trip-details`).remove();
          });
        };
      });
    }).fail(function(){
      console.log('FAIL');
    });
  }

  $('#load').on('click', () => {
    $('#trips').empty();
    loadTrips();
  });

  $('body').on('submit', 'form', function(e) {
    e.preventDefault();

    const url = $(this).attr('action');
    const formData = $(this).serialize();

    $.post(url, formData, () => {
      $('#message').html('<p> Reservation added! </p>');
    }).fail(() => {
      $('#message').html('<p> Adding Reservation failed! </p>');
    });
  });
});
