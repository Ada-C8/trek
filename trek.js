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
          let details = `
          <p>Id: ${response.id}</p>
          <p>Name: ${response.name}</p>
          <p>Destination: ${response.destination}</p>
          <p>Continent: ${response.continent}</p>
          <p> About: ${response.about}</p>
          <p> Category: ${response.category}</p>
          <p> Weeks: ${response.weeks}</p>
          <p> Cost: ${response.cost}</p>`;
          $('#tripDetail').html(details);
        })
      };
      // end loadOneTrip
      //  Events

      $('ul').on('click', 'h3', function(){
        let tripId = $(this).attr('data-id');
        loadOneTrip(tripId);
      });

      $('#load').on('click', function(){
        loadTrips();
      });
          
    });
