const baseUrl = 'https://trektravel.herokuapp.com/trips';

$(document).ready(() => {
  // callbacks;
  const loadTrips = function loadTrips() {
    $.get(baseUrl, (response) => {
      response.forEach((trip) => {
        // console.log(response);
        // const tripName = `<a class="trip-name">${trip.name}</a>`;
        const tripInfo = `<li><a data-id="${trip.id}">${trip.name}</a>`;

        // $('ul.trips').append(html);
        $('.trips > ul').append(tripInfo);
      });
    });
  };

  const loadTrip = function loadTrip(tripId) {
    const url = `${baseUrl}/${tripId}`;

    $.get(url, (response) => {
      let tripInfo = '<section class="trip">';
      const headings = Object.keys(response);

      for (let i = 0; i < headings.length; i += 1) {
        // skip name bc already displayed
        if (headings[i] !== 'name') {
          tripInfo += `<p>${headings[i]}: ${response[headings[i]]}</p>`;
        }
      }
      tripInfo += '</section>';

      console.log(tripInfo);
      // $('a').data(`id="${tripId}"`).after(tripInfo);
      // $(`a[data-id="${tripId}"]`).after(tripInfo);
      // $('a').data(`${tripId}`).after(tripInfo);
      $(`[data-id=${tripId}]`).after(tripInfo);
    });
  };

  // const loadDetails = function loadDetails(tripId) {
  //   const url = `${baseUrl}/${tripId}`;
  //
  //   $.get(url, (response) => {
  //     let html = '';
  //     const headings = Object.keys(response);
  //     for (let i = 2; i < headings.length; i += 1) { // skip id and name
  //       html += `<p>${headings[i]}: ${response[headings[i]]}<p>`;
  //     }
  //
  //     $(`#trip${tripId} > p`).after(html);
  //     $(`#trip${tripId}`).addClass('loaded');
  //   });
  // };

  // events
  $('#load').on('click', () => {
    loadTrips();
  });

  $('.trips').on('click', 'a', function load() {
    const tripId = $(this).data('id');
    console.log(tripId);
    loadTrip(tripId);
    // const tripId = $(this).next().text();
    //
    // // if details already loaded
    // if ($(`#trip${tripId}`).hasClass('loaded')) {
    //   $(`#trip${tripId}`).toggle();
    //   // load details and show
    // } else {
    //   loadDetails(tripId);
    //   $(`#trip${tripId}`).toggle();
    // }
    // // const html = `<p>${trip.id}</p><p>${trip.continent}</p><p>${trip.about}</p>`;
    // // $(this).after(html);
    // // console.log('some text');
    // // console.log($(this));
    // console.log(tripId);
    // // showDetails(tripId);
  });

  // $('.trips').on('click', 'section', function toggleDetails() {
  //   // const tripId = ($(this).next().text());
  //   // // if details already loaded
  //   // if ($(`#trip${tripId}`).hasClass('loaded')) {
  //   //   $(`#trip${tripId}`).toggle();
  //   //   // load details and show
  //   // } else {
  //   //   loadDetails(tripId);
  //   //   $(`#trip${tripId}`).toggle();
  //   // }
  //   const tripId = $(this).next().text();
  //   $(`#trip${tripId}`).toggle();
  // });

  // const showDetails = function showDetails(trip) {
  //
  // }
});
