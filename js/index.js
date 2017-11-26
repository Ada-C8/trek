const baseUrl = 'https://trektravel.herokuapp.com/trips';

const formatCost = function formatCost(num) {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

const pluralizeWeek = function pluralizeWeek(num) {
  return num === 1 ? 'week' : 'weeks';
};

const capitalize = function capitalize(string) {
  return string.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
};

$(document).ready(() => {
  $(document).foundation();

  // callbacks;
  const clearTrips = function clearTrips() {
    $('.trips > ul').empty();
    $('section.trips').removeClass('loaded');
  };

  const getTrips = function getTrips(url) {
    $.get(url, (response) => {
      response.forEach((trip) => {
        const tripInfo = `
        <li class="trip small-6 medium-4 large-3 cell grid-x align-center" data-equalizer-watch>
        <a>
        <h3 class="trip-name" data-id=${trip.id}>${trip.name}</h3>
        </a>
        <div class="align-self-bottom grid-x"><p class="small-6 cell continent">${trip.continent}</p>
        <p class="small-6 cell weeks">${trip.weeks} ${pluralizeWeek(trip.weeks)}</p>
        <div>
        <img src="./styles/images/mt-detail.jpeg" alt="desert mountain"/>
        </div>
        </div>`;

        $('.trips > ul').append(tripInfo);
      });
    });
  };

  const loadTrips = function loadTrips() {
    clearTrips();
    $('.trips').addClass('all');
    getTrips(baseUrl);
  };

  const loadTripsByContinent = function loadTripsByContinent(continent) {
    const url = `${baseUrl}/continent?query=${continent}`;
    clearTrips();
    $('.trips').removeClass('all');
    getTrips(url);
  };

  const loadTripsByCost = function loadTripsByCost(cost) {
    const url = `${baseUrl}/budget?&query=${cost}`;
    clearTrips();
    $('.trips').removeClass('all');
    getTrips(url);
  };

  const loadTripsByWeeks = function loadTripsByWeeks(weeks) {
    const url = `${baseUrl}/weeks?&query=${weeks}`;
    clearTrips();
    $('.trips').removeClass('all');
    getTrips(url);
  };

  const loadTrip = function loadTrip(tripId) {
    const url = `${baseUrl}/${tripId}`;

    $.get(url, (response) => {
      const tripInfo = `
      <section class="details grid-x align-center" data-id="${tripId}">
      <a class="small-12 cell">
      <h3>${response.name}</h3>
      </a>
      <div class="small-12 medium-7 large-5 cell">
      <img src="./styles/images/mt-detail.jpeg"
      alt="desert mountain"/>
      </div>
      <p class="small-12 cell about">${response.about}</p>
      <p class="small-4 medium-3 large-2 cell">${response.weeks} ${pluralizeWeek(response.weeks)}</p>
      <p class="small-4 medium-3 large-2 cell">${response.continent}</p>
      <p class="small-4 medium-3 large-2 cell">${formatCost(response.cost)}</p>
      <p class="small-4 medium-3 large-2 cell">${response.category}</p>
      <div class="small-12 grid-x align-center">
      <button id="show-form" data-id="${tripId}" class="small-12 medium-6 large-3 cell button">Interested?</button>
      </div>
      <section class="reservation small-10 medium-9 large-8 cell"></section>
      </section>`;

      $(`h3[data-id=${tripId}]`).addClass('details-loaded');
      $('.trip-details').append(tripInfo);
      $('.trips').hide();
      $('.add-trip').hide();
      $(`section[data-id=${tripId}]`).show();
    });
  };

  const loadResForm = function loadResForm(tripId) {
    if (!$(`h3[data-id=${tripId}]`).hasClass('form-loaded')) {
      const url = `${baseUrl}/${tripId}/reservations`;
      let formInfo = `<form action=${url} method="post">`;

      const params = ['name', 'age', 'email'];
      params.forEach((param) => {
        // capitalize label
        formInfo += `<label>${capitalize(param)}</label>`;
        formInfo += `<input type="text" id="${param}" name="${param}"/>`;
      });

      formInfo += '<button type="submit" class="button" id="reserve">Save a Spot!</button>';
      console.log(formInfo);

      $(`h3[data-id=${tripId}]`).addClass('form-loaded');
      $('.reservation').append(formInfo);
    }
  };

  const loadAddForm = function loadAddForm() {
    // if not already displayed
    if (!$('section.add-trip').hasClass('form-loaded')) {
      // const url = `${baseUrl}`;
      const params = {
        name: 'text',
        continent: 'text',
        about: 'text',
        category: 'text',
        weeks: 'number',
        cost: 'number',
      };

      let formInfo = `<form action=${baseUrl} method="post">`;

      Object.keys(params).forEach((param) => {
        formInfo += `<label>${capitalize(param)}</label>`;

        if (param === 'cost') {
          formInfo += '<input type="number" step="0.01" id="cost" name="cost"/>';
        } else {
          formInfo += `<input type="${params[param]}" id="${param}" name="${param}"`;
        }
      });
      formInfo += '<button class="button" type="submit" id="add">Confirm</button>';

      console.log(formInfo);
      $('section.add-trip').addClass('form-loaded');
      $('section.add-trip').append(formInfo);
    }
  };

  const reserveTrip = function reserveTrip(form) {
    const url = form.attr('action');
    const formData = form.serialize();

    $.post(url, formData, (response) => {
      $('form').trigger('reset');
      $('#reserve').after(`<p>trip reserved for ${response.name}</p>`);
    }).fail(() => {
      $('#reserve').after('<p>Failed to reserve trip</p>');
    });
  };

  const addTrip = function addTrip(form) {
    const url = form.attr('action');
    const formData = form.serialize();

    $.post(url, formData, (response) => {
      $('form').trigger('reset');
      console.log(response);
      alert('trip added!');
    }).fail((response) => {
      console.log(response);
      alert('failed to add trip');
    });
  };

  // event handlers
  $('.start').on('click', () => {
    $('body').removeClass('init');
    $('div.init').hide();
    $('header').addClass('grid-x');
    $('header').show();
    $('main').show();
    $('section.add-trip').hide();

    loadTrips();

    // display after loading to avoid showing at top then being pushed to bottom as trips load
    // still flickers at top briefly
    $('section.add-trip').fadeIn(1100);
  });

  $('.load').on('click', () => {
    // check if already loaded
    if ($('.trips').hasClass('all')) {
      $('.details').hide();
      $('.trips').show();
      $('.add-trip').show();
    } else {
      loadTrips();
    }
  });

  // when click on a trip in list of trips, show details
  $('.trips').on('click', 'h3', function load() {
    const tripId = $(this).data('id');

    // check if loaded
    if ($(`section[data-id=${tripId}]`).length) {
      // hide trips, show details for that trip
      $('.trips').hide();
      $('.add-trip').hide();
      $(`section[data-id=${tripId}]`).show();
      // load trips if not already loaded
    } else {
      loadTrip(tripId);
    }
  });

  // when click on trip name in details, hide details, show list
  $('.trip-details').on('click', 'h3', function showAll() {
    $(this).parent().parent().hide();
    $('.trips').show();
    $('.add-trip').show();
  });

  // display form when button is clicked
  $('.trip-details').on('click', '#show-form', function show() {
    const tripId = $(this).data('id');

    // check if loaded
    if ($(`h3[data-id=${tripId}]`).hasClass('form-loaded')) {
      const res = $(this).parent().next();

      res.toggle();
    } else {
      loadResForm(tripId);
    }
  });

  $('.trips').on('submit', 'form', function book(event) {
    event.preventDefault();
    reserveTrip($(this));
  });

  $('.trips').on('click', 'button.add-trip', () => {
    if ($('section.add-trip').hasClass('form-loaded')) {
      const add = $('section.add-trip form');
      add.toggle();
    } else {
      loadAddForm();
    }
  });

  $('.add-trip').on('submit', 'form', function add(event) {
    event.preventDefault();
    addTrip($(this));
  });

  // dropdown menus
  $('.menu .continents').on('click', 'a', function filterTrips() {
    const query = $(this).text();
    loadTripsByContinent(query);
  });

  $('.menu .cost').on('click', 'a', function filterTrips() {
    // deformat cost (remove dollar sign and commas)
    const query = $(this).text().slice(1).split(',')
      .join('');
    loadTripsByCost(query);
  });

  $('.menu .duration').on('click', 'a', function filterTrips() {
    // remove 'weeks' from query string
    const query = $(this).text().split(' ')[0];
    loadTripsByWeeks(query);
  });
});
