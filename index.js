const URL = 'https://trektravel.herokuapp.com/trips/';

$(document).ready(function(){

  let numTrips = 10;

  let tripTitle = function tripTitle(response, id){
    let name = response.name || 'untitled';
    let weeks = response.weeks || '0';
    return `<li class="trip no-show" id="${response.id}">
      <div class="row">
        <h3 class="small-8 medium-9 columns">${name}</h3>
        <h5 class="trip-weeks">${weeks} weeks</h5>
      </div>
    </li>`;
  };

  let tripAbout = function tripAbout(response, id){
    let continent = response.continent || 'unavailable';
    let category = response.category || 'unavailable';
    let cost = response.cost || '0';
    let about = response.about || 'no information currently available' ;
    return `<div class="about-trip">
      <div class="trip-info small-12 medium-6 columns">
        <h5>
          <strong>continent: </strong> ${continent}
        </h5>
      </div>
      <div class="trip-info small-12 medium-6 columns">
        <h5>
          <strong>category: </strong> ${category}
        </h5>
      </div>
      <div class="trip-info small-12 columns">
        <p class="trip-about">
          <em>${about}</em>
        </p>
        <a class="book-btn button no-collapse small-12 medium-6 large-3 columns">Book Now: $${cost}</a>
        <form class="hidden book-form no-collapse small-12 medium-8 columns row" id="book-form-${id}">
          <label for="email" class="no-collapse small-12 columns"><p><em>Enter your email address to reserve your spot now!</em></p></label>
          <input type="text" class="no-collapse small-12 medium-9 columns" name="email" placeholder="example@test.com" />

          <input type="submit" class="no-collapse button small-12 medium-3 columns" />
        </form>
      </div>
    </div>`;
  };

  $('#hero').on('click', '.button', function(e){
    $.get(URL, function(response) {
      for(let i = 0; i < response.length; i++) {
        $('#trip-list').append(tripTitle(response[i], i));
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
        target.removeClass('show');
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
    $('#book-form-' + id).toggleClass('hidden');
  });

  $('#trip-list').on('submit', 'form', function(e){
    e.preventDefault();
    let id = e.target.closest('.trip').id;
    console.log(id);
    let formData = $('#book-form-' + id).serialize();
    let postURL = URL + id + '/reservations';
    $.post(postURL, formData, function(response){
      console.log(response);
    });
    $('#book-form-' + id).html('<h4>Reservation request submitted.</h4>\n<h4><small>We will get back to you as soon as possible.</small></h4>');
  })
});
