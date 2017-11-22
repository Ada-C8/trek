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
        const tripInfo = `<li><a data-id="${trip.id}">${trip.name}</a>`;

        $('.trips > ul').append(tripInfo);
      });
    });
  };

  const loadTrip = function loadTrip(tripId) {
    // check if already displayed
    if (!$(`[data-id=${tripId}]`).hasClass('loaded')) {
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

        console.log(tripInfo);
        // $('a').data(`id="${tripId}"`).after(tripInfo);
        // $(`a[data-id="${tripId}"]`).after(tripInfo);
        // $('a').data(`id: ${tripId}`).after(tripInfo);
        $(`[data-id=${tripId}]`).addClass('loaded');
        $(`[data-id=${tripId}]`).after(tripInfo);
      });
    }
  };

  // events
  $('#load').on('click', () => {
    loadTrips();
  });

  $('.trips').on('click', 'a', function load() {
    const tripId = $(this).data('id');

    // check if loaded
    if ($(this).hasClass('loaded')) {
      $(this).next().toggle();
    } else {
      loadTrip(tripId);
    }
  });
});
