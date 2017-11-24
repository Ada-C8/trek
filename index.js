/* eslint-disable */

// --------------- All Trips HTML ---------------
const tripAppend = (trip) => {
  $('#trips').append(`
  <li id='${trip.id}'>
    <div class='featured-image'><img src="assets/${trip.continent}land.jpg"/></div>
    <article>
      <div class='continent'><img src="assets/${trip.continent}.png"/></div>
      <h3>${trip.name}</h3>
      <section class='trip-info'>
        <p>Modern expedition excursion traveling food culture like a local AirBnb.
        Flight modern er excursion ticket trek explore, modern nature colorful excursion design.</p>
      <h5>Explore ➤<span class='float-right'>${trip.weeks} weeks</span></h5>
      </section>
    </article>
  </li>`);
};

// --------------- All Trips -------------------
const tripArray = [];

$.get(
  'https://trektravel.herokuapp.com/trips',
  (response) => {
    for (let i = 0; i < response.length; i += 1) {
      const trip = {};
      trip.id = response[i].id;
      trip.name = response[i].name;
      trip.continent = response[i].continent;
      trip.weeks = response[i].weeks;

      tripArray.push(trip);

      if (i < 5) {
        tripAppend(trip);
      }
    }
  },
)
  .fail(() => {
    $('#main').append('<h3>Request failed</h3>');
  });

// -------------- Single Trip ------------------
const singleTrip = (id) => {
  $.get(
    `https://trektravel.herokuapp.com/trips/${id}`,
    (response) => {
      const { about } = response;
      const { cost } = response;
      const { category } = response;
      const { weeks } = response;

      $(`#${id} .trip-info`).hide();
      $(`#${id} .featured-image`).animate({ height: 200 }, 600);
      $(`#${id} article`).append(`
        <section class='trip-details'>
        <p><span class='flag float-left'>${category}</span>${weeks} weeks</p>
        <p>${about}</p>
        <p>$ ${parseInt(cost)}</p>
        </section>
        `);
    },
  )
    .fail(() => {
      $(`#${id}`).append('<h3>Request failed</h3>');
    });
};

// -------------- Document Ready ------------------
$(document).ready(() => {
  $('#all-trips').click(() => {
    $('#trips').toggle();
  });

  $('#trips').on('click', 'li', (event) => {
    const tripId = event.currentTarget.id;
    const tripDetail = `#${tripId} .trip-details`;

    if ($(tripDetail).length) {
      $(`#${tripId} .trip-info`).show();
      $(`#${tripId} .featured-image`).animate({ height: 480 }, 600);
      $(tripDetail).remove();
    } else {
      singleTrip(tripId);
    }
  });
});

// -------------- Infinite Scroll ---------------

document.addEventListener('scroll', () => {
  const scrollHeight = $(document).height();
  const scrollPosition = $(window).height() + $(window).scrollTop();
  const start = $('#trips')[0].childElementCount;

  if (((scrollHeight - scrollPosition) / scrollHeight === 0) && start < tripArray.length) {
    const tripsLeft = tripArray.length - start;
    const end = tripsLeft < 5 ? start + tripsLeft : (start) + 5;

    for (let i = (start); i < end; i += 1) {
      tripAppend(tripArray[i]);
    }
  }
});
