/* eslint-disable */

// --------------- All Trips HTML ---------------
const tripAppend = (trip) => {
  $('#trips').append(`
  <li id='${trip.id}' class='small-12 medium-7 large-5 small-centered columns'>
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

// ------------ Booking Form HTML --------------

const bookTrip = (id) => {
  $(`#${id}`).after(`<form action='https://trektravel.herokuapp.com/trips/${id}/reservations' method='post'>
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
      <button type='submit'>Reserve</button>
    </section>
  </form>`);
};

$(document).ready(() => {
  $('body').on('submit', 'form', function(e) {
    e.preventDefault();
    const url = $(this).attr('action');
    const formData = $(this).serialize();

    $.post(url, formData, (response) => {
      $('#message').html('<h3>Pet added!</h3>');
      console.log(response);
    }).fail(() => {
      $('#message').html('<h3>Adding pet failed.</h3>');
    }).always(() => {
      console.log('Making code');
    });
  });
});

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
        <p>$ ${parseInt(cost, 10)} <small>+ TAX</small></p>
        </section>
        `);
      $(`#${id}`).after(`<p id='booking-btn' class='small-12 medium-7 large-5 small-centered columns'>book now</p>`);
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
      $(`#${tripId} .featured-image`).animate({ height: 450 }, 600);
      $(tripDetail).remove();
      $('#booking-btn').remove();
    } else {
      singleTrip(tripId);
    }
  });

  $('body').on('click', '#booking-btn', (event) => {
    const tripId = event.currentTarget.previousElementSibling.id;
    bookTrip(tripId);

    // on click, full screen white 0.5 opacity background
    // form overlay section fill
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
