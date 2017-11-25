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
        <a><h3 class="trip-name" data-id=${trip.id}>${trip.name}</h3></a>
        <div class="align-self-bottom grid-x"><p class="small-6 cell continent">${trip.continent}</p>
        <p class="small-6 cell weeks">${trip.weeks} ${pluralizeWeek(trip.weeks)}</p>
        <div><img src="./styles/images/mt-detail.jpeg" alt="desert mountain"/></div></div>`;

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
      <a class="small-12 cell"><h3>${response.name}</h3></a>
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
        formInfo += `<label>${param[0].toUpperCase() + param.slice(1)}</label>`;
        formInfo += `<input type="text" id="${param}" name="${param}"/>`;
      });

      formInfo += '<button type="submit" class="button" id="reserve">Save a Spot!</button>';
      console.log(formInfo);

      $(`h3[data-id=${tripId}]`).addClass('form-loaded');
      $('.reservation').append(formInfo);
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

  // events
  $('.start').on('click', () => {
    $('body').removeClass('init');
    $('div.init').hide();
    $('header').addClass('grid-x');
    $('header').show();
    $('main').show();

    loadTrips();
  });

  $('.load').on('click', () => {
    // check if already loaded
    if ($('.trips').hasClass('all')) {
      $('.details').hide();
      $('.trips').show();
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

  // dropdown menus
  $('.menu .continents').on('click', 'a', function filterTrips() {
    const query = $(this).text();
    loadTripsByContinent(query);
  });

  $('.menu .cost').on('click', 'a', function filterTrips() {
    // deformat cost
    const query = $(this).text().slice(1).split(',').join('');
    loadTripsByCost(query);
  });

  $('.menu .duration').on('click', 'a', function filterTrips() {
    const query = $(this).text().split(' ')[0];
    loadTripsByWeeks(query);
  });
});
