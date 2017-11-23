$(document).ready(() => {
  const index = function index() {
    const url = 'https://trektravel.herokuapp.com/trips';
    $.get(url, (indexResponse) => {
      $('table:first-child').replaceWith(`<table class="trips"><tr>
      <th>Trip Name</th>
      <th>Continent</th>
      <th>Duration</th>
      </tr></table>`);
      indexResponse.forEach((trip) => {
        $('.trips').append(`<tr class="${trip.id}">
        <td>${trip.name}</td>
        <td>${trip.continent}</td>
        <td>${trip.weeks} Weeks</td>
        </tr>`);
      });
    }).fail(() => {
      $('.message').html('<h2>Sorry, something went wrong! Try back later...</h2>');
    });
  };
  const show = function show(trip) {
    const url = `https://trektravel.herokuapp.com/trips/${trip}`;
    $.get(url, (showResponse) => {
      $('.show-trip').replaceWith(`<div class="show-trip"><div class="trip-container">
        <h3>${showResponse.name}</h3>
        <h4>Price: $${showResponse.cost}</h4>
        <h4>Trip Duration: ${showResponse.weeks} Weeks</h4>
        <h4>Continent: ${showResponse.continent}</h4>
        <h4>Category: ${showResponse.category}</h4>
        <h4>About Trip:</h4>
        <p>${showResponse.about}</p>
        <form action="https://trektravel.herokuapp.com/trips/${trip}/reservations" method="post">
          <section>
            <label>Name</label>
            <input type="text" id="name" name="name" />
            <label>Age</label>
            <input type="text" id="age" name="age" />
            <label>Email</label>
            <input type="text" id="email" name="email" />
          </section>
          <section class="button">
            <button type="submit">Make Reservation</button>
          </section>
        </form>
      </div>
      </div>`);
    }).fail(() => {
      $('.message').html('<h2>Sorry, something went wrong! Try back later...</h2>');
    });
  };
  $('.index-button').click((e) => {
    $(e.target).hide();
    $(e.target).addClass('off-landing');
    $('.show-trip').hide();
    $('.index-trips').show();
    $('.show-trip').replaceWith('<div class="show-trip"></div>');
    $('.message').empty();
    index();
  });
  $('.index-trips').on('click', 'tr', (e) => {
    const id = e.target.closest('tr').className;
    $('.index-button').show();
    $('.index-trips').hide();
    show(id);
    $('.show-trip').show();
  });
  $('body').on('submit', 'form', (e) => {
    e.preventDefault();
    const url = $('form').attr('action'); // Retrieve the action from the form
    const formData = $('form').serialize();

    $.post(url, formData, () => {
      $('.message').html('<h2>Pack your bags: your reservation is confirmed!</h2>');
    }).fail(() => {
      $('.message').html('<h2>Sorry, something went wrong! Please try again!</h2>');
    });
  });
});
