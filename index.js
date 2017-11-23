
const getTrips = function getTrips() {
  // if (query[0].empty()) {
    $('#tripList ol').show();
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      console.log(response);
      response.forEach((trip) => {
        const tripName = `<li data-id="${trip.id}">${trip.name}</li>`;
        $('#tripList ol').append(tripName);
      });
    })
    .fail(() => {
      console.log('failure');
    })
    .always(() => {
      console.log('always even if we have success or failure');
    }); // } else {

    // }

  }; // end of getTrips function

  const viewTripsbyContinent = function viewTripsbyContinent() {
    const continentDropdown = `<select id="continentSelector">
    <option value="null">Continents</option>
    <option value="africa">Africa</option>
    <option value="asia">Asia</option>
    <option value="australia">Australia</option>
    <option value="europe">Europe</option>
    <option value="northAmerica">North America</option>
    <option value="southAmerica">South America</option>
    </select>`;
    $('#tripsByContientSelector').append(continentDropdown);
    $('#tripsByContientSelector').change(function() {
      // $('#tripList ol').hide();
      let e = document.getElementById('continentSelector');
      // console.log(e);
      let selectedContinent = e.options[e.selectedIndex].text;
      // console.log(selectedContinent);

      $.get(`https://trektravel.herokuapp.com/trips/continent?query=${selectedContinent}`, (response) => {
        console.log(response);
        response.forEach((trip) => {
          const tripName = `<li data-id="${trip.id}">${trip.name}</li>`;
          $('#tripList ol').append(tripName);
        });
      })
      .fail(() => {
        console.log('failure');
      })
      .always(() => {
        console.log('always even if we have success or failure');
      });
    });
  };

  const viewTrip = function viewTrip(tripID) {
    $.get(`https://trektravel.herokuapp.com/trips/${tripID}`, (response) => {
      const tripInfo =
      `<div data-id="${response.id}">
      <p> ~ Click Anywhere to Hide ~ </p>
      <h2> ${response.name} </h2>
      <p> Continent: ${response.continent} </p>
      <p> Description: ${response.about} </p>
      <p> Category: ${response.category} </p>
      <p> Weeks: ${response.weeks} </p>
      <p> Cost: ${response.cost} </p>
      </div>
      <button id="reserveFormButton" data-id="${response.id}"> Reserve this Trip </button>`;
      console.log(tripInfo);
      $('#tripInfo').append(tripInfo);
      $('#tripList ol').hide();
    })
    .fail((response) => {
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    })
    .always(() => {
      console.log('Looking for adventure...');
    });
  }; // end of viewTrip function

  const reserveForm = function reserveTripForm(tripID) {
    console.log(tripID);
    const reservationForm = `
    <div id="message"></div>
    <form action="https://trektravel.herokuapp.com/trips/${tripID}/reservations" method="post" data-id="${tripID}">
    <section>
    <label>Name</label>
    <input type="text" id="name" name="name"></input>
    </section>
    <section class="button">
    <button type="submit">Finalize Reservation</button>
    </section>
    </form>`;
    $('#reserveFormField').append(reservationForm);
    finalizeReservation();
  }; // end of reserveTrip function

  const finalizeReservation = function finalizeReservation() {
    $('#reserveFormField').on('submit', 'form', function(e) {

      e.preventDefault();
      const url = $(this).attr('action'); // Retrieve the action from the form
      console.log(url);
      const formData = $(this).serialize();
      $(this).hide();
      $.post(url, formData, (response) => {
        $('#message').html('<p> Trip Reserved! </p>');
        // What do we get in the response?
        console.log(response);
      }).fail(() => {
        $('#message').html('<p>Reserving Trip Failed</p>');
      });
    });
  };

  $(document).ready(() => {

    viewTripsbyContinent();

    $('#button').on('click', () => {
      getTrips();
    });

    $('#tripInfo').on('click', '#reserveFormButton', function() {
      console.log('SOMETHING IS HAPPENING');

      const tripID = $(this).attr('data-id');
      console.log($(this));
      $(this).hide();

      reserveForm(tripID);
    });

    $('#tripList ol').on('click', 'li', function() {
      const tripID = $(this).attr('data-id');
      viewTrip(tripID);
    });

    $('#tripInfo').on('click', 'div',  function() {
      const tripID = $(this).attr('data-id');
      console.log(tripID);
      $(this).hide();
      const buttonToHide = $( `[data-id="${tripID}"][id="reserveFormButton"]`)
      $(buttonToHide).hide();
      const formToHide = $(`[data-id="${tripID}"][action]`)
      $(formToHide).hide();
      $('#tripList ol').show();
    });
  });
  // EVENTS
