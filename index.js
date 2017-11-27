$(document).ready(function() {
  let loadTrips = function loadTrips() {
    url = "https://trektravel.herokuapp.com/trips";
    $.get(`${url}`, function(data) {
      for (let trip of data) {
        if (trip.continent != null) {
          let tripInfo = $(
            '<tr id="trip' + trip.id + '">'
            + '<td class="trip-name">' + '<a class="trip-title" data-id =' + trip.id + '>' + trip.name + '</a>' + '</td>'
            + '<td class="trip-cont">' + trip.continent + '</td>'
            + '<td class="trip-week">' + trip.weeks + '</td>'
            + '</tr>'
          );
          $('#trip-list').append(tripInfo);
        }
      }
    });
  };

  let loadTrip = function loadTrip(id) {
    url = `https://trektravel.herokuapp.com/trips/${id}`
    $.get(`${url}`, function(data) {
      data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
      data.cost = parseFloat(Math.round(data.cost * 100) / 100).toFixed(2);
      let tripInfo = $(
        '<tr class="trip-deets">'
        + '<td colspan="3">'
        + '<table class="deet-table">'
        + '<tr>'
        + '<td>' + '<i class="fa fa-tags"></i> Category: ' + data.category + '</td>'
        + '<td>' + '<i class="fa fa-usd"></i> Cost: ' + data.cost + '</td>'
        + '</tr>'
        + '<tr>'
        + '<td class="about-text" colspan="2">' + data.about + '</td>'
        + '</tr>'
        + '<tr>'
        + '<td class="about-text" colspan="2"><button type="button" id="reservation' + id + '" class="btn btn-warning reserve-go">Reserve Trip</button>' + '</td>'
        + '</tr>'
        + '</table>'
        + '</td>'
        + '</tr>'
      );

      $(`tr#trip${data.id}`).after(tripInfo);
      $('div#reserve-modal').removeClass().addClass(`reserve-${data.id}`);
    });
  };

  let details_exist = false;
  let current_trip_id;

  $('tbody#trip-list').on('click', 'a', function() {
    let tripID = $(this).attr('data-id');

    if (current_trip_id != tripID) {
      $('tr[id^=trip]').css('background', 'none');
      $('table.table').find('tr.trip-deets').each(function() {
        $(this).remove();
      });
      details_exist = false;
      current_trip_id = null;
      loadTrip(tripID);
      $(`tr#trip${tripID}`).css('background', '#777');
      details_exist = true;
      current_trip_id = tripID;

    } else {
      $('tr[id^=trip]').css('background', 'none');
      $('table.table').find('tr.trip-deets').each(function() {
        $(this).remove();
      });
      details_exist = false;
      current_trip_id = null;
    }
  });

  $('#all-trips').on('click', function() {
    let imageHeight = $('section.hero-image').css('height');
    if (imageHeight == '780px') {
      $('section.hero-image').css('height', '100px');
      $('div.image-wrapper').css('padding', '0');
      $('div.title-row').css('height', '100%');
      $(this).css('width', '50%');

      $('h1.title').removeClass('col-12').addClass('col');
      $('div.button-wrapper').removeClass().addClass('col align-self-center button-wrapper');
    }
    else {
      $('section.hero-image').css('height', '780px');
      $('div.image-wrapper').css('padding', '15%');
      $('div.title-row').css('height', '50%');
      $(this).css('width', '100%');

      $('h1.title').removeClass('col').addClass('col-12');
      $('div.button-wrapper').removeClass().addClass('col-sm-12 col-md-6 col-lg-3 align-self-center button-wrapper');
    }
    $('.table').toggle('slow');
    loadTrips();
  });

  $('#trip-list').on('click', '.reserve-go', function() {
    $('div#reserve-modal').show('slow');
  });
  $('i.modal-close').on('click', function() {
    $('div#reserve-modal').hide('slow');
    $('div#success').hide('slow');
    $('div#failure').hide('slow');
  })

  let successCallback = function(response) {
    console.log("Successfully posted reservation");
    console.log(response);
    $('div#reserve-modal').hide();
    $('div#success').show();
  };

  $('#reserve-form').on('submit', function(event) {
    event.preventDefault();

    let formData = $('#reserve-form').serialize();
    let id = $('#reserve-modal').attr("class");
    id = id.slice(8);
    id = parseInt(id);
    let reserve_url = `https://trektravel.herokuapp.com/trips/${id}/reservations`;

    $.post(reserve_url, formData, successCallback).fail((response) => {
      console.log("Failed to submit reservation");
      $('div#reserve-modal').hide();
      $('div#failure').show();
    });
  });

});
