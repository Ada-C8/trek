$(document).ready(function() {
  let loadTrips = function loadTrips() {
    url = "https://trektravel.herokuapp.com/trips";
    $.get(`${url}`, function(data) {
      for (let trip of data) {
        let tripInfo = $(
          '<tr id="trip' + trip.id + '">'
          + '<td data-id =' + trip.id + '>' + trip.name + '</td>'
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
      let tripInfo = $(
        '<tr>'
        + '<td colspan="3">'
        + '<table>'
        + '<tr>'
        + '<td>' + data.category + '</td>'
        + '<td>' + data.cost + '</td>'
        + '</tr>'
        + '<tr>'
        + '<td colspan="2">' + data.about + '</td>'
        + '</tr>'
        + '</table>'
        + '</td>'
        + '</tr>'
      )

      $(`tr.trip${id}`).append(tripInfo);
    });
  };

  $('tbody#trip-list').on('click', 'td', function() {
    let tripID = $(this).attr('data-id');
    loadTrip(tripID);
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
