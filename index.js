const URL = 'https://trektravel.herokuapp.com/trips/';

$(document).ready(function(){
  let numTrips = 10;

  $('#hero').on('click', '.button', function(e){
    $.get(URL, function(response) {
      for(let i = 0; i < response.length; i++) {
        $('#trip-list').append(
          '<li class="trip" id="'
          + response[i].id
          + '"><div class="row"><h3>'
          + response[i].name
          + '</h3><h5>'
          + response[i].weeks
          + ' weeks</h5></div></li>'
        );
      }
    });

    $('main > section').toggleClass('hidden');
  });

  let tripAbout = function tripAbout(response){
    let continent = response.continent;
    let category = response.category;
    let cost = response.cost;
    let about = response.about;
    return `<div class="about-trip">
      <div class="trip-info small-12 medium-6 columns">
        <p>
          <strong>continent: </strong> ${continent}
        </p>
      </div>
      <div class="trip-info small-12 medium-6 columns">
        <p>
          <strong>category: </strong> ${category}
        </p>
      </div>
      <div class="trip-info small-12 columns">
        <p class="trip-about">
          <em>${about}</em>
        </p>
        <a class="button book-btn small-12 medium-6 large-3 columns">Book Now: $${cost}</a>
      </div>
    </div>`;
  };

  $('#trip-list').on('click', function(e){
    console.log(e);
    if (!e.target.className.includes('button')) {
      let id = e.target.closest('.trip').id;
      $('.about-trip').remove();
      target = $('#' + id);
      if (target.hasClass('show')) {
        target.addClass('show');
      } else {
        $('.trip').removeClass('show');
        target.addClass('show');
        $.get(URL + id, function(response) {
          target.append(tripAbout(response));
        });
      }
    }
  });
});
