const ALL_TRIPS_URL = 'https://trektravel.herokuapp.com/trips';

$(document).ready(() => {
  $('#all-trips').click(function() {
    $.get(ALL_TRIPS_URL,
      response => {
        console.log('success!');
        console.log(response);

        response.forEach(function(trip) {
          let name = trip.name,
              // id = trip.id,
              continent = trip.continent,
              weeks = trip.weeks;
          let tripsAppend = `<li data-id=${trip.id}>` + '<h5 >' + name + '</h5></li>'

          $('.list-trips ol').append(tripsAppend);
        });
      })
    .fail(function(response){
      console.log(response);
      console.log('failure');
      $('#fail').html('<p>Request was unsuccessful</p>')
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  });

  // Event listening for individual trip click
  $('.list-trips').on('click', 'li', function(event) {
    let tripId = $(this).attr('data-id');
    let tripUrl = ALL_TRIPS_URL + '/' + `${tripId}`;
    $.get(tripUrl, response => {
      $(this).append(
        '<p>Location: ' + response.continent + '</p>' + '<p>Duration: ' + response.weeks + ' (week(s))</p>' +
        '<p>Category: ' + response.category + '</p>' + '<p>Cost: $' + response.cost + '</p>' + '<p>Description: ' + response.about + '</p>').toggleClass('toggle');
      $(this).append('<div class="button">Make a Reservation</div>');
      $(this).click((event) => {
        event.stopPropagation();
      });
    // })
    // .fail(function(response){
    //   console.log(response);
    //   console.log('failure');
    //   $('#fail').html('<p>Request was unsuccessful</p>')
    // })
    // .always(function(){
    //   console.log('always even if we have success or failure');
    // });

    // listen for button click to make reservation
    $(this).one('click', 'div', function() {
      // generate form
      let form = `<form action="${tripURL}/reservations" id="add-res">
      <label for="name">Name: </label><input type="text" name="name"></input>
      <label for="age"></label>Age: <input type="number" name="age"></input>
      <label for="email">Email: </label><input type="text" name="email"></input>
      <input type="submit" value="Reserve trip"></input>
      </form>`;
      $(this).after(form);
      // $( .button').hide();
      // $( ".result" ).html( data );
      // $(this).click((event) => {
      //   event.stopPropagation();
      // });
    // });
    // }); //show more details for individual trip
  }); //.one click to make res

  // listen for submit and post
  $('#add-res').submit(function(event) {
    event.preventDefault();

    let resURL = $('#add-res').attr('action');
    let formData = $('#add-res').serialize();

    // let resUrl = tripUrl + '/reservations';

    $.post(resUrl, formData, response => {
      console.log('successful reservation');
      $(".result").html(response);
    })
    .fail((response) => {
      console.log('Did not reserve');
    });
  }); //submit res
});
});
}); //document.ready
