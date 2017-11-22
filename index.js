/*eslint-disable*/
$(document).ready(() => {
  const index = function index() {
    const url = 'https://trektravel.herokuapp.com/trips';
    $.get(url, (indexResponse) => {
      $('table:first-child').replaceWith(`<table class="trips"><tr>
      <th>Name</th>
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
    });
  };
  const show = function show(trip) {
    const url = `https://trektravel.herokuapp.com/trips/${trip}`;
    $.get(url, (showResponse) => {
      $('.show-trip').replaceWith(`<div class="show-trip">
        <h2>${showResponse.name}</h2>
        <h3>Price: $${showResponse.cost}</h3>
        <h3>Trip Duration: ${showResponse.weeks} Weeks</h3>
        <h3>Continent: ${showResponse.continent}</h3>
        <h3>Category: ${showResponse.category}</h3>
        <p>${showResponse.about}</p>
        <form action="https://trektravel.herokuapp.com/trips/${trip}/reservations" method="post">
          <section>
            <label>Name</label>
            <input type="text" id="name" name="name" />
            <label>Age</label>
            <input type="integer" id="age" name="age" />
            <label>Email</label>
            <input type="text" id="email" name="email" />
          </section>
          <section class="button">
            <button type="submit">Make Reservation</button>
          </section>
        </form>
        </div>`
      );
    });
  };
  $('.index-button').click((e) => {
    $(e.target).hide();
    $('.show-trip').hide();
    $('.index-trips').show();
    $('.show-trip').replaceWith('<div class="show-trip"></div>');
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

    $.post(url, formData, (response) => {
      alert('Reservation Succeeded');
  });
  });
});
