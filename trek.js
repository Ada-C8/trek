$(document).ready( function() {

  let loadTrips = function loadTrips(){
    $('#load').hide();
    // $('#trips').show();
    const urlTripName = 'https://trektravel.herokuapp.com/trips';
    $.get(urlTripName,
      (response) => {
        $('h1').html('List of Trips');
        for (trip of response) {
          let tripName = `<li><a data-id=${trip.id}> ${trip.name}</a>
          </li>`

          $('#trips ul').append(tripName);
        }
      }).fail((response) => {
        let badRequest = `<p class=bad >Something went wrong loading trip options</p>`
        $('#ajax-results').html(badRequest);
        console.log("Didn't go so hot");
      });
    };

    // End loadTrips

    let loadOneTrip = function loadOneTrip(tripId){
      $('.good').hide();
      let urlTripDetails = 'https://trektravel.herokuapp.com/trips/'
      urlTripDetails += tripId;
      $.get(urlTripDetails,
        function(response) {
          let details = `
          <div class="large-8 columns">
          <h2> ${response.name}</h2>
          <table>
          <tr>
          <th>Weeks</th>
          <th>Cost</th>
          <th>Destination</th>
          <th>Continent</th>
          <th>Category</th>
          </tr>
          <tr>
          <td>${response.weeks}</td>
          <td>${response.cost}</td>
          <td>${response.destination}</td>
          <td>${response.continent}</td>
          <td>${response.category}</td>
          </tr>
          </table>
          <p> ${response.about}</p>
          <button id="reserve" class="button" data-trip=${response.id}> Reserve this trip! </button>
          </div>`;

          $('#tripDetail').html(details);
          $('#tripDetail').show();
          $('#reserve').on('click', function(){
            let tripId = $(this).attr('data-trip');
            generateForm(tripId);
          });
        }).fail((response) => {
          let badRequest = `<p class=bad >Something went wrong loading this trip</p>`
          $('#ajax-results').html(badRequest);
          console.log("Didn't go so hot");
        });
      };
      // end loadOneTrip


      const successCallback = function(response) {
        let generatedHMTL = `<p class="good"> You reserve this trip successfully </p>`
        $('#ajax-results').html(generatedHMTL);
      };


      let generateForm = function generateForm(id){
        $('#reserve').hide();
        $('form').show();


        event.preventDefault();
        let form =
        `<label for="name">Name:</label>
        <input type="text" name="name" required></input>
        <input type="hidden" name="trip_id" value="${id}" ></input>
        <label for="email">Email:</label>
        <input type="email" name="email" required></input>
        <input id="submitForm" type="submit" class="button" value="Reserve Trip"></input>
        `
        // $('#reserveTrip').validate();
        $('#reserveTrip').html(form);

        $('#submitForm').on('click', function(){

          event.preventDefault();

          reserveTrip(id);
          $('#tripDetail').hide();
          $('form').hide();

        });

      };

      let reserveTrip = function reserveTrip(tripId){

        let urlReservation =
        `https://trektravel.herokuapp.com/trips/${tripId}/reservations`;


        let formData = $('#reserveTrip').serialize();
        $.post(urlReservation, formData, successCallback).fail((response) => {
          let badRequest = `<p class=bad >Something went wrong making your reservation</p>`
          $('#ajax-results').html(badRequest);
          console.log("Didn't go so hot");
        });
      };

      //  Events

      $('ul').on('click', 'a', function(){

        let tripId = $(this).attr('data-id');
        loadOneTrip(tripId);
      });

      $('#load').on('click', function(){
        $('.good').hide();
        loadTrips();
      });

    });
