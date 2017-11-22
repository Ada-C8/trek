const URL = 'https://trektravel.herokuapp.com/trips';

$(document).ready(function(){
  let numTrips = 10;

  $('#hero').on('click', '.button', function(e){
    $.get(URL, function(response) {
      console.log(response);
      for(let i = 0; i < response.length; i++) {
        $('#trip-list').append('<li class="trip" id="'
                               + response[i].id
                               + '"><h3>'
                               + response[i].name
                               + '</h3></li>');
      }
    });

    $('main > section').toggleClass('hidden');
  });

  $('#trip-list').on('click', 'h3', function(e){
    let id = e.target.parentElement.id;
    $('.trip').removeClass('show');
    $('#' + id).addClass('show');
  });
});
