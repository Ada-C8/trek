/* eslint-disable */
$.get(
  'https://trektravel.herokuapp.com/trips',
  (response) => {
    for (let i = 0; i < response.length; i += 1) {
      const { id } = response[i];
      const { name } = response[i];
      const { continent } = response[i];
      const { weeks } = response[i];
      $('#trips').append(`<li id='${id}'>
        <h3 id='${id}'>${name}</h3>
        <p>Continent: ${continent}</p>
        <p>Duration: ${weeks} weeks</p>
      </li>`);
    }
  },
)
  .fail(() => {
    $('#main').append('<h3>Request failed</h3>');
  });

const singleTrip = (id) => {
  $.get(
    `https://trektravel.herokuapp.com/trips/${id}`,
    (response) => {
      const { name } = response;
      const { continent } = response;
      const { weeks } = response;
      const { about } = response;
      const { cost } = response;
      const { category } = response;
      $(`#${id}`).html(`<h3>${name}</h3>
        <p>Continent: ${continent}</p>
        <p>Duration: ${weeks} weeks</p>
        <p>Cost: ${cost}</p>
        <p>Category: ${category}</p>
        <p>${about}</p>
        <form action='https://trektravel.herokuapp.com/trips/${id}/reservations' method='post'>
          <section>
            <label>Name</label>
            <input type='text' id='name' name='name' />
          </section>

          <section>
            <label>Age</label>
            <input type='text' id='age' name='age' />
          </section>

          <section>
            <label>Email</label>
            <input type='text' id='email' name='email' />
          </section>

          <section>
            <button type='submit'>Reserve Trip</button>
          </section>
        </form>`);
    },
  )
    .fail(() => {
      $(`#${id}`).append('<h3>Request failed</h3>');
    });
};

$(document).ready(() => {
  $('#all-trips').click(() => {
    $('#trips').toggle();
  });

  $('#trips').on('click', 'h3', function(event) {
    singleTrip(event.currentTarget.id);
  });

  $('form').submit( function(e) {
    e.preventDefault();
    const url = $(this).attr('action');
    const formData = $(this).serialize();

    $.post(url, formData, (response) => {
      $('form').append('<h3>Trip Reserved</h3>');
      console.log(response);
    }).fail(() => {
      $('form').append('<h3>Trip failed to reserve</h3>');
    }).always(() => {
      console.log('Making code');
    });
  });
});
