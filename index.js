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
      <article>
      <div class='continent'><img src="assets/${continent}.png"/></div>
        <h3>${name}</h3>
        <section class='trip-info'>
        <p>Modern expedition excursion traveling food culture like a local AirBnb. Flight modern er excursion ticket trek explore, modern nature colorful excursion design.</p>
        <h5>Explore ➤<span class='float-right'>${weeks} weeks</span></h5>
        </section>
        </article>
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
      const { weeks } = response;
      const { about } = response;
      const { cost } = response;
      const { category } = response;

      $(`#${id} .trip-info`).hide();
      $(`#${id} .landscape`).animate({height:200},600);
      $(`#${id} article`).append(`
        <section class='trip-details'>
        <p>${weeks} weeks</p>
        <h1>$ ${cost}</h1>
        <p>${category}</p>
        <p>${about}</p>
        </section>
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

  $('#trips').on('click', 'li', (event) => {
    const tripId = event.currentTarget.id;
    const tripDetail = `#${tripId} .trip-details`;

    if($(tripDetail).length){

      $(`#${tripId} .trip-info`).show();
      $(`#${tripId} .landscape`).animate({height:480},600);
      $(tripDetail).remove();
    }else{
      singleTrip(tripId);
    }
  });

  // $('form').submit( function(e) {
  //   e.preventDefault();
  //   const url = $(this).attr('action');
  //   const formData = $(this).serialize();
  //
  //   $.post(url, formData, (response) => {
  //     $('form').append('<h3>Trip Reserved</h3>');
  //     console.log(response);
  //   }).fail(() => {
  //     $('form').append('<h3>Trip failed to reserve</h3>');
  //   }).always(() => {
  //     console.log('Making code');
  //   });
  // });
});
