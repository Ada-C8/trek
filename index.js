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
        <h3>${name}</h3>
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
      const { about } = response;
      const { cost } = response;
      const { category } = response;
      $(`#${id}`).append(`<p>Cost: ${cost}</p>
          <p>Category: ${category}</p>
          <p>${about}</p>`);
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

  $('#trips').on('click', 'li', (event) => {
    singleTrip(event.currentTarget.id);
  });
});
