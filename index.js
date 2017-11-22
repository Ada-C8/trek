$(document).ready(function() {
  let loadTrips = function loadTrips() {
    url = "https://trektravel.herokuapp.com/trips";
    $.get(`${url}`, function(data) {
      for (let trip of data) {
        let tripInfo = $(
          '<tr id="trip' + trip.id + '">'
          + '<td>' + '<a class="trip-title" data-id =' + trip.id + '>' + trip.name + '</a>' + '</td>'
          + '<td>' + trip.continent + '</td>'
          + '<td>' + trip.weeks + '</td>'
          + '</tr>'
        );
        $('#trip-list').append(tripInfo);
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
        + '<table>'
        + '<tr>'
        + '<td>' + '<i class="fa fa-tags"></i> Category: ' + data.category + '</td>'
        + '<td>' + '<i class="fa fa-usd"></i> Cost: ' + data.cost + '</td>'
        + '</tr>'
        + '<tr>'
        + '<td class="about-text" colspan="2">' + data.about + '</td>'
        + '</tr>'
        + '</table>'
        + '</td>'
        + '</tr>'
      );

      $(`tr#trip${data.id}`).after(tripInfo);
    });
  };

  let details_exist = false;

  $('tbody#trip-list').on('click', 'a', function() {
    let tripID = $(this).attr('data-id');
    if (details_exist == true) {
      $('table.table').find('tr.trip-deets').each(function() {
        $(this).remove();
      });
      details_exist = false;
    }
    loadTrip(tripID);
    details_exist = true;
  });

  $('#all-trips').on('click', function(event) {
    let imageHeight = $('section.hero-image').css('height');
    if (imageHeight == '780px') {
      $('section.hero-image').css('height', '100px');
      $('div.image-wrapper').css('padding', '0');
      $('div.wtf-row').css('height', '100%');
      $(this).css('width', '30%');

      $('h1.title').removeClass('col-12').addClass('col');
      $('div.button-wrapper').removeClass('col-12').addClass('col');

    }
    else {
      $('section.hero-image').css('height', '780px');
      $('div.image-wrapper').css('padding', '15%');
      $('div.wtf-row').css('height', '50%');
      $(this).css('width', '20%');

      $('h1.title').removeClass('col').addClass('col-12');
      $('div.button-wrapper').removeClass('col').addClass('col-12');
    }
    $('.table').toggle('slow');
    loadTrips();
  });
});
