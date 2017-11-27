$(document).ready(function() {
$('#load-trips').click(function(event) {
  $.get('https://trektravel.herokuapp.com/trips',
  response => {
    console.log('success!');
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      $('#trips').append(`<article id='trip-${response[i].id}'><button class="dropdown button small-12">${response[i].name}</button></article>`);

      $(`#trip-${response[i].id} > button`).click(function(event) {
        console.log('you clicked');
        if (window.$(`#info-${response[i].id}`)[0])  {
          $(`#info-${response[i].id}`).remove();
        } else {
        $.get(`https://trektravel.herokuapp.com/trips/${response[i].id}`,
        trip => {
          $(`#trip-${trip.id}`).append(`<section class="row"><section id='info-${trip.id}' class='panel small-10 small-centered columns'><p>ID: ${trip.id}</p>
            <p>NAME: ${trip.name}</p>
            <p>CONTINENT:${trip.continent}</p>
            <p>COST: ${trip.cost}</p>
            <p>CATEGORY: ${trip.category}</p>
            <p>WEEKS: ${trip.weeks}</p>
            <p>ABOUT: ${trip.about}</p>
            <form action='https://trektravel.herokuapp.com/trips/${trip.id}/reservations' method='post' id='form-${trip.id}'>
            <section>
              <label>Name</label>
              <input type="text" id="name" placeholder="identification required"/>
            </section>
            <section>
              <label>Email</label>
              <input type="text" id="email" placeholder="electronic document transmission"/>
            </section>
            <section>
              <label>Age</label>
              <input type="text" id="email" placeholder="age in relation to orbital period of Earth around solar body"/>
            </section>
            <section>
              <button type="submit" class="button round">Reserve a Spot for ${trip.name}</button>
            </section>
            </form>
            </section>
            </section>`);
            $('body').on('submit', 'form', function (e){
              e.preventDefault();
              const url = $(this).attr('action');
              const formData = $(this).serialize();

              $.post(url, formData, (response) => {
                // $('#message').text('Reservation saved').show().fadeOut(9000);
                $('#message').html('Reservation Saved<br><img src="assets/greenglobe.gif"/>').show().fadeOut(10000);
              }).fail(() => {
                $('#message').html('<p>reserving your spot failed aaarrroooo0o</p>');
              }).always(() => {
                console.log('looks like you made a request to reserve a spot, how did that go?');
              });
            });
        });
}
        })
      };
    });
  });
  }).fail(function(){
      console.log('failure');
      $('#message').html('<p>Request failed no0o0</p>');
    }).always(function(){
      console.log('always even if we have success or failure');
    }); // Note that this is where the semi-colon ends up
// });
