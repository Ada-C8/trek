/*eslint-disable*/
$(document).ready(()=>{
  $('#bookingForm').hide();
  $('#all').on('click', () => {
    $('#bookingForm').hide();
    const url = 'https://trektravel.herokuapp.com/trips'

    $.get(url, response => {
      $('#trips').empty();
      const allTrips = response;
      for (let i = 0; i < allTrips.length; i++){
        const trip = allTrips[i]
        $('#trips').append($(`<h3>${trip.name}</h3>`).attr('id', `${trip.id}`));
        console.log(trip);
      }
    })
    .fail(function() {
      $('#trips').text('Sorry! Invalid Request.')
    })
    .always(function() {
      console.log("this always happens!")
    })
  });

  $('#trips').on('click', 'h3', function(){
    $('#bookingForm').hide();
    const id = $(this).attr('id');
    console.log(id)
    const url2 = `https://trektravel.herokuapp.com/trips/${id}`
    $.get(url2, response => {
      const thisTrip = response
      // console.log(thisTrip);
      $('#trips').empty()

      const details = `<article id=${id}><h2>${thisTrip.name}</h2> <ul><li>${thisTrip.continent}</li><li>${thisTrip.category}</li><li>${thisTrip.about}</li><li>Cost: $${thisTrip.cost}</li><li>${thisTrip.weeks} Weeks</li></ul><button id="book">Book This Trip</button></article>`

      $('#trips').append(details);
    })
  });

  $('#trips').on('click', '#book', function(){
    const tripNum = $(this).parent().attr('id');
    console.log('CLICK!')
    $('#trips').empty()
    $('#bookingForm').show();
    console.log(tripNum);
    const url = `https://trektravel.herokuapp.com/trips/${tripNum}/reservations`
    $('#bookingForm').prepend(`<form action=${url} method="post">`)
  })
});
