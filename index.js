const baseUrl = 'https://trektravel.herokuapp.com/trips';

const formatCost = function formatCost(num) {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

$(document).ready(() => {
  // callbacks;
  const loadTrips = function loadTrips() {
    $.get(baseUrl, (response) => {
      response.forEach((trip) => {
        const tripInfo = `<li><section class="trip"><a data-id=${trip.id}>${trip.name}</a></section>`;

        $('.trips > ul').append(tripInfo);
      });
    });
  };

  const loadTrip = function loadTrip(tripId) {
    // check if already displayed
    if (!$(`a[data-id=${tripId}]`).hasClass('loaded')) {
      const url = `${baseUrl}/${tripId}`;

      $.get(url, (response) => {
        let tripInfo = '<div class="trip-wrapper"><section class="details loaded">';
        const headings = Object.keys(response);

        for (let i = 0; i < headings.length; i += 1) {
          // skip name bc already displayed
          if (headings[i] !== 'name') {
            if (headings[i] === 'cost') {
              tripInfo += `<p>${headings[i]}: ${formatCost(response[headings[i]])}</p>`;
            } else {
              tripInfo += `<p>${headings[i]}: ${response[headings[i]]}</p>`;
            }
          }
        }
        tripInfo += `<button id="show-form" data-id=${tripId}>Interested?</button>`;
        tripInfo += '</section>';
        tripInfo += '<section class="reservation">';
        // tripInfo += `<button class="button" id="show-form" data-id=${tripId}>Book Trip</button>`;
        tripInfo += '</section></div>';

        $(`a[data-id=${tripId}]`).addClass('details-loaded');
        $(`a[data-id=${tripId}]`).after(tripInfo);
      });
    }
  };

  const loadResForm = function loadResForm(tripId) {
    if (!$(`a[data-id=${tripId}]`).hasClass('form-loaded')) {
      const url = `${baseUrl}/${tripId}/reservations`;
      let formInfo = `<form action=${url} method="post">`;

      const params = ['name', 'age', 'email'];
      params.forEach((param) => {
        // capitalize label
        formInfo += `<label>${param[0].toUpperCase() + param.slice(1)}</label>`;
        formInfo += `<input type="text" id="${param}" name="${param}"/>`;
      });

      formInfo += '<button type="submit" class="button" id="reserve">Save a Spot!</button>';
      console.log(formInfo);

      $(`a[data-id=${tripId}]`).addClass('form-loaded');
      // console.log($(this));
      // $(`button[data-id]=${tripId}`).after(formInfo);
      // btn.after(formInfo);
      $('.reservation').append(formInfo);
    }
  };

  const reserveTrip = function reserveTrip(form) {
    const url = form.attr('action');
    const formData = form.serialize();

    console.log(url);
    console.log(formData);

    $.post(url, formData, (response) => {
      console.log(response);
      $('form').trigger('reset');
      $('#reserve').after(`<p>trip reserved for ${response.name}</p>`);
    }).fail(() => {
      console.log('Failed to reserve trip');
    });
  };

  // const addTrip = function addTrip() {
  //   const url = `${baseUrl}/new`;
  //
  // };

  // events
  $('#load').on('click', () => {
    loadTrips();
  });

  $('.trips').on('click', 'a', function load() {
    const tripId = $(this).data('id');

    // check if loaded
    if ($(this).hasClass('details-loaded')) {
      $(this).next().toggle();
      // const details = $(this).next();
      // const reservation = details.next();
      // // $(this).next().toggle();
      // details.toggle();
      // reservation.toggle();
    } else {
      loadTrip(tripId);
    }
  });

  // display form when button is clicked
  $('.trips').on('click', '#show-form', function show() {
    const tripId = $(this).data('id');
    console.log(tripId);

    // check if loaded
    if ($(`a[data-id=${tripId}]`).hasClass('form-loaded')) {
      const res = $(this).parent().next();
      console.log(res);

      res.toggle();
    } else {
      // const btn = $(this);
      console.log(tripId);
      loadResForm(tripId);
    }
  });

  $('.trips').on('submit', 'form', function book(event) {
    event.preventDefault();

    reserveTrip($(this));
  });
});
