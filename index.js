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
      <div class='landscape'><img src="assets/landscape.jpg"/></div>
      <div class='continent'><img src="assets/${continent}.png"/></div>
      <section class='trip-info'>
        <h3 id='${id}'>${name}</h3>
        <p>Modern expedition excursion traveling food culture like a local AirBnb. Flight modern er excursion ticket trek explore, modern nature colorful excursion design.</p>
        <h5>Explore ➤<span class='float-right'>${weeks} weeks</span></h5>
        </section>
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
      $(`#${id}`).html(`<div class='continent'><img src="assets/${continent}.png"/></div>
        <h3>${name}</h3>
        <p>${continent}</p>
        <p>${weeks} weeks</p>
        <p>$ ${cost}</p>
        <p>${category}</p>
        <p>${about}</p>
        `);
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
    console.log(event);
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
