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
// ====================================================
        $('.trip-details').on('click',() =>{
        });
// ====================================================

      // });
      const loadDetails = function loadDetails () {
        $.get(`https://trektravel.herokuapp.com/trips/${data-id}`, (response) => {
          console.log('IT WORKED');

          response.forEach(function(info){
            let addInfo = `<ul data-id=${info.id} data-name=${info.name} data-continent=${info.continent} data-about=${info.about} data-weeks=${info.weeks} data-category=${info.category} data-cost=${info.cost}>
              <li>${info.name}</li>
              <li>${info.continent}</li>
              <li>${info.about}</li>
              <li>${info.weeks}</li>
              <li>${info.category}</li>
              <li>${info.cost}</li>
            <ul>`;

            $('#trips').append(addInfo);
          })
        });
      }
     }); //here
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
