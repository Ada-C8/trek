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
        const tripInfo = `<li><a data-id=${trip.id}>${trip.name}</a>`;

        $('.trips > ul').append(tripInfo);
      });
    });
  };

  const loadTrip = function loadTrip(tripId) {
    // check if already displayed
    if (!$(`a[data-id=${tripId}]`).hasClass('loaded')) {
      const url = `${baseUrl}/${tripId}`;

      $.get(url, (response) => {
        let tripInfo = '<section class="trip loaded">';
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
        tripInfo += '</section>';
        tripInfo += '<section class="reservation">';
        tripInfo += `<button class="button" id="show-form" data-id=${tripId}>Book Trip</button>`;
        tripInfo += '</section>';

        // $('a').data(`id="${tripId}"`).after(tripInfo);
        // $(`a[data-id="${tripId}"]`).after(tripInfo);
        // $('a').data(`id: ${tripId}`).after(tripInfo);
        $(`a[data-id=${tripId}]`).addClass('details-loaded');
        $(`a[data-id=${tripId}]`).after(tripInfo);
      });
    }
  };

  const loadForm = function loadForm(tripId, btn) {
    if (!$(`a[data-id=${tripId}]`).hasClass('form-loaded')) {
      const url = `${baseUrl}/${tripId}/reservations`;
      let formInfo = `<form action=${url} method="post">`;

      const params = ['name', 'age', 'email'];
      params.forEach((param) => {
        formInfo += `<label>${param}</label>`;
        formInfo += `<input type="text" id="${param}" name="${param}"/>`;
      });

      formInfo += '<button type="submit" class="button" id="reserve">Save a Spot!</button>';
      console.log(formInfo);

      $(`a[data-id=${tripId}]`).addClass('form-loaded');
      // console.log($(this));
      // $(`button[data-id]=${tripId}`).after(formInfo);
      btn.after(formInfo);
    }
  };

  const reserveTrip = function reserveTrip(form) {
    const url = form.attr('action');
    const formData = form.serialize();

    console.log(url);
    console.log(formData);

    $.post(url, formData, (response) => {
      console.log(response);
      $('#reserve').after('<p>TRIP ADDED</p>');
    }).fail(() => {
      console.log('FAIL');
    }).always(() => {
      console.log('always say something');
    });
  };

  // events
  $('#load').on('click', () => {
    loadTrips();
  });

  $('.trips').on('click', 'a', function load() {
    const tripId = $(this).data('id');

    // check if loaded
    if ($(this).hasClass('details-loaded')) {
      $(this).next().toggle();
    } else {
      loadTrip(tripId);
    }
  });

  // display form when button is clicked
  $('.trips').on('click', '#show-form', function show() {
    const btn = $(this);
    const tripId = btn.data('id');
    console.log(tripId);
    loadForm(tripId, btn);
  });

  $('.trips').on('submit', 'form', function book(event) {
    event.preventDefault();

    reserveTrip($(this));
  });
});
