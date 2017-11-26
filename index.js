// ------------ Booking Form --------------

const bookTrip = (id) => {
  $(`#${id}`).after(`<article class='fullscreen'>
  <form action='https://trektravel.herokuapp.com/trips/${id}/reservations' method='post'
  class='small-12 medium-7 large-5 small-centered columns form'>
  <section>
  <input type='text' id='name' name='name' placeholder='Name' />
  </section>

  <section>
  <input type='text' id='age' name='age' placeholder='Age' />
  </section>

  <section>
  <input type='text' id='email' name='email' placeholder='Email' />
  </section>

  <section>
  <button type='submit button'>Complete Booking</button>
  </section>
  </form>
  </article>`);
  $('.fullscreen').hide().fadeIn(250);

  function popup() {
    $(document).click(() => {
      $(document).off('click');
      $('.fullscreen').remove();
    })

    $('.form').click((event) => {
      event.stopPropagation();
    });
  }
  setTimeout(popup, 250);
};

$(document).ready(() => {
  $('body').on('submit', 'form', function form(e) {
    e.preventDefault();
    const url = $(this).attr('action');
    const formData = $(this).serialize();

    $.post(url, formData, () => {
      $('.form').html('<h3>Booking Complete</h3>');
    }).fail(() => {
      $('.form').html('<h3>Booking failed</h3>');
    });
  });
});

// --------------- All Trips HTML ---------------
const tripAppend = (trip) => {
  const lands = ['Africa', 'Antarctica', 'Asia', 'Australasia', 'Europe', 'South America', 'North America', 'Null'];

  if (!lands.includes(trip.continent)) {
    trip.continent = null;
  }

  const html = `
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
    </li>`;

  if ($('#trips')[0].childElementCount < 5) {
    $('#trips').append(html);
  } else {
    $('#trips').append(html);
    $('#trips li:last-child').hide().fadeIn(1000);
  }
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
    $('#all-trips').after('<h3>Trips Failed to load</h3>');
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
      $(`#${id}`).after('<p id="booking-btn" class="small-12 medium-7 large-5 small-centered columns">book now</p>');
    },
  )
    .fail(() => {
      $(`#${id}`).append('<h3>Request failed</h3>');
    });
};

// -------------- Click Events ------------------
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
