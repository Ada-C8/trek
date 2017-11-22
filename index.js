const URL = 'https://trektravel.herokuapp.com/trips/';

$(document).ready(function(){
  let numTrips = 10;

  let tripAbout = function tripAbout(response, id){
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
        <a class="book-btn button no-collapse small-12 medium-6 large-3 columns">Book Now: $${cost}</a>
        <form class="hidden book-form no-collapse small-12 medium-8 columns row" id="book-form-${id}">
          <input type="text" class="no-collapse small-12 medium-9 columns" name="name" placeholder="Your Name" />

          <input type="submit" class="no-collapse button small-12 medium-3 columns" />
        </form>
      </div>
    </div>`;
  };

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

  $('#trip-list').on('click', function(e){
    console.log(e);
    if (!e.target.className.includes('no-collapse')) {
      let id = e.target.closest('.trip').id;
      $('.about-trip').remove();
      target = $('#' + id);
      if (target.hasClass('show')) {
        target.addClass('show');
      } else {
        $('.trip').removeClass('show');
        target.addClass('show');
        $.get(URL + id, function(response) {
          target.append(tripAbout(response, id));
        });
      }
    }
  });

  $('#trip-list').on('click', '.book-btn', function(e) {
    let id = e.target.closest('.trip').id;
    $('#book-form-' + id).removeClass('hidden');
  });
});
