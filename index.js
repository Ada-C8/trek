/* eslint-disable */

$('#load-trips').click(function(event) {
  $.get('https://trektravel.herokuapp.com/trips',
  response => {
    console.log('success!');
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      $('#trips').append(`<article id='trip-${response[i].id}'><h3>trip #${response[i].id}</h3></article>`);
      $(`#trip-${response[i].id}`).click(function(event) {
        $.get(`https://trektravel.herokuapp.com/trips/${response[i].id}`,
        trip => {
          $(`#trip-${trip.id}`).append(`<table><tr><td>ID: ${trip.id}</td>
            <td>NAME: ${trip.name}</td>
            <td>CONTINENT:${trip.continent}</td>
            <td>COST: ${trip.cost}</td>
            <td>CATEGORY: ${trip.category}</td>
            <td>WEEKS: ${trip.weeks}</td></tr></table>
            <table>
            <tr><td>ABOUT: ${trip.about}</td></tr></table>`);
        });
        })

      };
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
