/* eslint-disable */

$(document).ready(() => {
  $('body').on('submit', 'form', function(e) {
    e.preventDefault();
    console.log(this);
    const url = $(this).attr('action');
    const formData = $(this).serialize();

    $.post(url, formData, (response) => {
      $("#message").html('<p>Spot reserved!</p>');
      console.log(response);
    }).fail(() => {
      $("#message").html("<p>Unable to complete reservation</p>")
    }).always(() => {
      console.log("always always always here");
    });
  });

  let loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
      let basicInfo = '';
      for (let trip = 0; trip < response.length; trip++) {
        let name = response[trip].name;
        if (name == null || name == "" || name.length === 1) {
          continue;
        }
        let continent = response[trip].continent;
        let weeks = response[trip].weeks;
        if (weeks === 1) {
          weeks = '1 week'
        } else {
          weeks = `${weeks} weeks`;
        }
        let id = response[trip].id;
        basicInfo += `
            <section class='main-info'>
              <button data-id=${id}>${name}</button>
              <section class='row'>
                <p class='columns medium-6'>Continent: ${continent}</p>
                <p class='columns medium-6'>Duration: ${weeks}</p>
              </section>
              <section class='panel${id}'></section>
            </section>`;

      }
      $('.panel').html(basicInfo);
      console.log(basicInfo);
    })
      .fail(function(response) {
        console.log(response);
        $('.fail').html('<p>Request was unsuccessful</p>');
        })
        .always(function() {
          console.log('Always always always');
        });

  }; //end of loadTrips

  let loadTrip = function loadTrip(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        let tripDeets = `
          <section class='panel-info'>
            <p class= 'about'>About: ${response.about}</p>
            <section class='row one-line'>
              <p class='columns medium-4'>Category: ${response.category}</p>
              <p class='columns medium-4'>Cost: $${response.cost.toFixed(2)}</p>
              <p class='columns medium-4'>ID: ${response.id}</p>
            </section>
            <section id='message'></section>
            <form action='https://trektravel.herokuapp.com/trips/${id}/reservations' method='post'>
              <section>
                <label>Name</label>
                <input type="text" id="name" name="name"></input>
              </section>
              <section>
                <label>Age</label>
                <input type="text" id="age" name="age"></input>
              </section>
              <section>
                <label>Email</label>
                <input type="text" id="email" name="email"></input>
              </section>
              <section class='button'>
                <button class='reserve' type='submit'>Reserve Now</button>
              </section>
            </form>

          </section>

            `;
        $(`.panel${id}`).html(tripDeets);
      }) //loop ends here
      .fail(function(response) {
        console.log(response);
        $('.fail').html('<p>Request was unsuccessful</p>');
        })
        .always(function() {
          console.log('Always always always');
        });

  }; //end of loadTrip

// *****************EVENTS
$('button').on('click', function() {
  $('.panel').toggle(loadTrips());
});

  $('.panel').on('click', 'button', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let tripId = $(this).attr('data-id');

    loadTrip(tripId);

    return $(`.panel${tripId}`).toggle('open');
  });

});
