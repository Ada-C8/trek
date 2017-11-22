const URL = 'https://trektravel.herokuapp.com/trips/';

$(document).ready(function(){
  let numTrips = 10;

  $('#hero').on('click', '.button', function(e){
    $.get(URL, function(response) {
      console.log(response);
      for(let i = 0; i < response.length; i++) {
        $('#trip-list').append(
          '<li class="trip" id="'
          + response[i].id
          + '"><h3 class="trip-component">'
          + response[i].name
          + '</h3></li>'
        );
      }
    });

    $('main > section').toggleClass('hidden');
  });

  $('#trip-list').on('click', '.trip-component', function(e){
    let id = e.target.parentElement.id;
    $('.about-trip').remove();
    target = $('#' + id);
    if (target.hasClass('show')) {
      target.addClass('show');
    } else {
      $('.trip').removeClass('show');
      target.addClass('show');
      $.get(URL + id, function(response) {
        console.log(response);
        target.append(
          '<div class="about-trip trip-component"><p><strong>continent:</strong> '
          + response.continent
          + '</p><p><strong>category: </strong> '
          + response.category
          + '</p><p><strong>length: </strong> '
          + response.weeks + ' weeks'
          + '</p><p><strong>cost: </strong> $'
          + response.cost
          + '</p><p><em> '
          + response.about
          + '</em></p></div>'
        );
      });
    }
  });
});
