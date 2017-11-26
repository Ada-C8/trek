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
      const formInfo = `
        <form action=${url} method="post">
        <label>Name</label>
        <input type="text" id="res-name" name="name"/>
        <label>Age</label>
        <input type="number" placeholder="Must be 18 or older" min="18" id="age" name="age"/>
        <label>Email</label>
        <input type="email" id="email" name="email"/>
        <button type="submit" class="button" id="reserve">Book It</button>
        </form>`;

      $(`h3[data-id=${tripId}]`).addClass('form-loaded');
      $('.reservation').append(formInfo);
    }
  };

  const loadAddForm = function loadAddForm() {
    // if not already displayed
    if (!$('section.add-trip').hasClass('form-loaded')) {
      // const url = `${baseUrl}`;
      const formInfo = `
        <form action=${baseUrl} method="post" class="small-12 medium-8 large-6 cell">
        <label>Name</label>
        <input type="text" id="new-trip-name" name="name"/>
        <label>Continent</label>
        <select id="continent" name="continent">
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Australasia">Australasia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
        </select>
        <label>About</label>
        <textarea id="about" name="about" placeholder="Description" maxlength="500" rows="5"/>
        <label>Category</label>
        <input type="text" id="category" name="category"/>
        <label>Weeks</label>
        <input type="number" id="weeks" name="weeks"/>
        <label>Cost</label>
        <input type="number" id="cost" name="cost" step="0.01"/>
        <button class="button" type="submit" id="add">Confirm</button>
        </form>`;

      $('section.add-trip').addClass('form-loaded');
      $('section.add-trip div').append(formInfo);
    }
  };

  const reserveTrip = function reserveTrip(form) {
    const url = form.attr('action');
    const formData = form.serialize();

    $.post(url, formData, (response) => {
      $('form').trigger('reset');
      alert(`Trip reserved for ${response.name}`);
    }).fail(() => {
      alert('Failed to reserve trip');
    });
  };

  const addTrip = function addTrip(form) {
    const url = form.attr('action');
    const formData = form.serialize();

    $.post(url, formData, () => {
      $('form').trigger('reset');
      alert('Trip added!');
    }).fail(() => {
      alert('Failed to add trip');
    });
  };

  // event handlers
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
      // set focus to name if form is vis
      if (res.is(':visible')) {
        $('#res-name').focus();
      }
    } else {
      loadResForm(tripId);
      $('#res-name').focus();
    }
  });

  $('.trip-details').on('submit', 'form', function book(event) {
    event.preventDefault();
    reserveTrip($(this));
  });

  $('.add-trip').on('click', 'button.add-trip', () => {
    if ($('section.add-trip').hasClass('form-loaded')) {
      $('.add-trip-form').toggle();

      // move focus to name if form is visible
      if ($('.add-trip-form').is(':visible')) {
        $('#new-trip-name').focus();
      }
    } else {
      loadAddForm();
      $('#new-trip-name').focus();
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
