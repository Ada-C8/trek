$(document).ready(() => {
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips/', (response) => {
      console.log('success!');

      response.forEach((trip) => {
        const tripInfo = $(`<article class="article-block" data-id=${trip.id} data-name=${trip.name} data-continent=${trip.continent}>
        <p>${trip.name}</p>
        <ul class="details"></ul>
        <button class="trip-details">View Trip Details</button>
        </article>`);

        $('#trips').append(tripInfo);

        // moving this inside of the first each loop so that we have access to the ID so we can pass it to the loadTripDetails function.
        tripInfo.find('.trip-details').on('click', () => {
          console.log('WORKING?????');
          loadTripDetails(trip.id);
        });

        const loadTripDetails = function loadTripDetails(id) {
          $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) => {
          // console.log('IT WORKED');
          // console.log(response);
            let addInfo = `<li>Trip ID: ${response.id}</li>
              <li>Continent: ${response.continent}</li>
              <li>About: ${response.about}</li>
              <li>Category: ${response.category}</li>
              <li>Weeks: ${response.weeks}</li>
              <li>Price: $${response.cost}</li>
              <li><button id="reserve">RESERVE SPOT</button></li>`;

            let reserveForm = `<form action="https://trektravel.herokuapp.com/trips/${id}/reservations" method="post">
              <section>
                <label>Name</label>
                <input type="text" id="name" name="name"></input>
              </section>

              <section>
                <label>Email</label>
                <input type="text" id="email" name="email"></input>
              </section>

              <section>
                <label>Age</label>
                <input type="text" id="Age" name="age"></input>
              </section>

              <section class="submit">
                <button type="submit">Confirm</button>
              </section>
            </form>`;

            $(`[data-id="${id}"] .details`).append(addInfo);
            $(`[data-id="${id}"] .trip-details`).remove();

            $('#reserve').on('click', () => {
              $(reserveForm).remove();
              $(`[data-id="${id}"] .details`).append(reserveForm);
            });

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
// -----------------------------------------
  // $('#load').on('click', () => {
  //   $('#trips').empty();
  //   loadTrips();
  // });
// ------------------------------------------
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
