$(document).ready(() => {
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips/', (response) => {
      console.log('success!');

      response.forEach(function(trip){
        let tripInfo = `<article data-id=${trip.id} data-name=${trip.name} data-continent=${trip.continent} data-weeks=${trip.weeks}>
          <ul class="details">
            <li>${trip.name}</li>
            <button class="trip-details">View Trip Details</button>
          </ul>
        </article>`;

        $('#trips').append(tripInfo);

        // moving this inside of the first each loop so that we have access to the ID so we can pass it to the loadDetails function.
        $('.trip-details').on('click',() => {
          console.log('WORKING?????');
          loadDetails(trip.id);
        });

      // });
      const loadDetails = function loadDetails(id) {
        $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) => {
          console.log('IT WORKED');

          // response.forEach(function(info){
            let addInfo = `<ul data-id=${response.id} data-name=${response.name} data-continent=${response.continent} data-about=${response.about} data-weeks=${response.weeks} data-category=${response.category} data-cost=${response.cost}>
              <li>${response.name}</li>
              <li>${response.continent}</li>
              <li>${response.about}</li>
              <li>${response.weeks}</li>
              <li>${response.category}</li>
              <li>${response.cost}</li>
            </ul`;

            // let firstLi = $(this).closest('li');
            $('.details').append(addInfo);
            // $('.trip_details').remove();
          // })
        });
       }
     });
    });
  }

  $('#load').on('click', () => {
    $('#trips').empty();
    loadTrips();
  });
});

// tried turning off the click function.
// limiting the click functions. (effects all buttons).
// tried creating a new function.
// something to do with it loading on page.
// does not work outside of the load trips function.
