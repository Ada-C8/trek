$(document).ready(function() {

  $('#all-trips').on('click', function(event) {

    let imageHeight = $('section.hero-image').css('height');
    if (imageHeight == '780px') {
      $('section.hero-image').css('height', '100px');
      $('div.image-wrapper').css('padding', '0');
      $('h1.title').removeClass('col-12').addClass('col');
      $('div.button-wrapper').removeClass('col-12').addClass('col');
    }
    else {
      $('section.hero-image').css('height', '780px');
      $('div.image-wrapper').css('padding', '15%');
      $('h1.title').removeClass('col').addClass('col-12');
      $('div.button-wrapper').removeClass('col').addClass('col-12');
    }

    $('.table').toggle('slow');


    url = "https://trektravel.herokuapp.com/trips";
    $.get(`${url}`, function(data) {
      for (let trip of data) {
        let tripInfo = $(
          '<tr>'
          + '<td>' + '<a>' + trip.name + '</a>' + '</td>'
          + '<td>' + trip.continent + '</td>'
          + '<td>' + trip.weeks + '</td>'
          + '</tr>'
        );
        $('#trip-list').append(tripInfo);
      }
    });
  });


});
