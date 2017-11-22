$(document).ready(() => {
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips/', (response) => {
      console.log('success!');

      response.forEach(function(trip){
        let tripInfo = `<article data-id=${trip.id} data-name=${trip.name} data-continent=${trip.continent} data-weeks=${trip.weeks}>
          <ul>
            <li>${trip.name}</li>
            <button class="trip_details">View Trip Details</button>
          </ul>
        </article>`;

        $('#trips').append(tripInfo);
      });
      const loadDetails = function loadDetails () {
        $.get(`https://trektravel.herokuapp.com/trips/${"data-id"}`, (response) => {
          console.log('IT WORKED');

          response.forEach(function(additionalInfo){
            let addInfo = `<li></li><li></li><li></li>`
          })
        });
      }
    });
  }

// put the url in the each loop!
  // const loadDetails = function loadDetails () {
  //   $.get('https://trektravel.herokuapp.com/trips/', (response) => {
  //     console.log('IT WORKED');
  //   });
  // }


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
