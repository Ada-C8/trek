$(document).ready( function() {

  let loadTrips = function loadTrips(){
    const urlTripName = 'https://trektravel.herokuapp.com/trips';
    $.get(urlTripName,
      (response) => {
        $('h1').append('List of Trips');
        for (trip of response) {
          let tripName = `<li><h3 data-id=${trip.id}> ${trip.name}</h3>
          </li>`

          $('#trips ul').append(tripName);
        }
      })
    };
    // End loadTrips

    let loadOneTrip = function loadOneTrip(tripId){

      let urlTripDetails = 'https://trektravel.herokuapp.com/trips/'
      urlTripDetails += tripId;
      $.get(urlTripDetails,
        function(response) {
          // tla vez no necesito el id this_trip
          let details = `
          <p id="this_trip" >Id: ${response.id}</p>
          <p>Name: ${response.name}</p>
          <p>Destination: ${response.destination}</p>
          <p>Continent: ${response.continent}</p>
          <p> About: ${response.about}</p>
          <p> Category: ${response.category}</p>
          <p> Weeks: ${response.weeks}</p>
          <p> Cost: ${response.cost}</p>
          <button id="reserve" data-trip=${response.id}> Reserve this trip! </button>`;
          $('#tripDetail').html(details);
          $('#reserve').on('click', function(){
            let tripId = $(this).attr('data-trip');
            generateForm(tripId);
          });
        })
      };
      // end loadOneTrip
      // Necesito pasar parametros????


      const successCallback = function(response) {
        console.log("POST request was successful");
        console.log(response);
        let generatedHMTL = `<p> this is the response ${ response } </p>`
        // let generatedHMTL = '<p>Everything went great,';
        // generatedHMTL += `and your trip ${ response["name"] } has been added to the DB!</p>`;
        $('#ajax-results').html(generatedHMTL);
      };


      let generateForm = function generateForm(id){

                event.preventDefault();
                let form =
                `<label for="name">Name:</label>
                <input type="text" name="name"></input>
                <input type="hidden" name="trip_id" value="${id}" ></input>
                <label for="email">Email:</label>
                <input type="text" email="email"></input>
                <input id="submitForm" type="submit" value="Reserve Trip"></input>
                `
                $('#reserveTrip').html(form);

                $('#submitForm').on('click', function(){
                  event.preventDefault();
                  reserveTrip(id);
                });

      };

      let reserveTrip = function reserveTrip(tripId){

        let urlReservation =
        `https://trektravel.herokuapp.com/trips/${tripId}/reservations`;


        let formData = $('#reserveTrip').serialize();

        $.post(urlReservation, formData, successCallback).fail((response) => {
          console.log("Didn't go so hot");
        });
      };

      //  Events

      $('ul').on('click', 'h3', function(){
        let tripId = $(this).attr('data-id');
        loadOneTrip(tripId);
      });

      $('#load').on('click', function(){
        loadTrips();
      });




    });
