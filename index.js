/* eslint-disable */
$(document).ready(function() {
$('#load-trips').click(function(event) {
  $.get('https://trektravel.herokuapp.com/trips',
  response => {
    console.log('success!');
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      $('#trips').append(`<article id='trip-${response[i].id}'><h3>trip #${response[i].id}</h3></article>`);

      $(`#trip-${response[i].id} > h3`).click(function(event) {
        if ($(`#info-${response[i].id}[0]`).length == 1) {
          console.log($(`#info-${response[i].id}[0]`));
          $(`#info-${response[i].id}`).toggle();
        } else {

        $.get(`https://trektravel.herokuapp.com/trips/${response[i].id}`,
        trip => {
          console.log($(`#info-${trip.id}`));
          $(`#trip-${trip.id}`).append(`<section id='info-${trip.id}'><button id='hide-${trip.id}'>hide me </button><table><tr><td>ID: ${trip.id}</td>
            <td>NAME: ${trip.name}</td>
            <td>CONTINENT:${trip.continent}</td>
            <td>COST: ${trip.cost}</td>
            <td>CATEGORY: ${trip.category}</td>
            <td>WEEKS: ${trip.weeks}</td></tr></table>
            <table>
            <tr><td>ABOUT: ${trip.about}</td></tr></table>
            <form action='https://trektravel.herokuapp.com/trips/${trip.id}/reservations' method='post' id='form-${trip.id}'>
            <section>
            <button type="submit">Reserve a Spot for ${trip.name}</button>
            </section>
            </form>
            </section>`);
            $('body').on('submit', 'form', function (e){
              e.preventDefault();
              const url = $(this).attr('action');
              const formData = $(this).serialize();

              $.post(url, formData, (response) => {
                $('#message').html(`<p>Reserved your spot!</p>`);
              }).fail(() => {
                $('#message').html('<p>reserving your spot failed aaarrroooo0o</p>');
              }).always(() => {
                console.log('looks like you made a request to reserve a spot, how did that go?');
              });
            });
            // $(`#hide-${trip.id}`).click(function(event) {
            //   console.log('im hiding');
            //   $(`#info-${trip.id}`).toggle();
            // });
        });
}
        })

      };
    });
  });

  });
    // .fail(function(){
    //   console.log('failure');
    //   $('#message').html('<p>Request failed no0o0</p>');
    // })
    // .always(function(){
    //   console.log('always even if we have success or failure');
    // }); // Note that this is where the semi-colon ends up
// });
