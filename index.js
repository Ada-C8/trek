$(document).ready(function() {
  const getTrips = function getTrips () {
    let url = 'https://trektravel.herokuapp.com/trips'

    $.get(url,
      function (response) {
        // let trips = response

        // let tripName = response[0]
        // console.log(tripName);
        response.forEach((trip) => {
          let tripName = trip['name']
          // console.log(tripName);

          $('#trips ul').append(`<li><a href="/Users/angelawilson/test/ADA/week-16/trek/trip.html" data-id="${trip['id']}" >${tripName}</a></li>`)
        })

      } // end function (response)
    ) // end $.get
  } // end getTrips()

  const trip = function trip (id) {
    let url = 'https://trektravel.herokuapp.com/trips/1'

    $.get(url, function(response) {
      // console.log(response);

      let tripInfo =
      `
      <h2 data-id=${response.id}> ${response.name} </h2>
      <p> Continent: ${response.continent} </p>
      <p> Category: ${response.category} </p>
      <p> Duration: ${response.weeks} weeks </p>
      <p> Cost: $${response.cost} </p>
      <p> About: ${response.about} </p>
      `;

      $('#trip').append(tripInfo)
    }) // end $.get

  } // end trip(id)
  // $('#loadTrips').on('click', getTrips)
  $('#loadTrips').on('click', getTrips)
  // $('#trip').on('click', trip)

  // 'a' targets the anchor tag with the trip.id in it. this gives the id when console.logging
  $('#trips ul').on('click', 'a', function(){
    let tripID = $(this).attr('data-id');
    console.log(tripID);
    trip(tripID);
  });

})
