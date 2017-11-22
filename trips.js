/*eslint-disable*/
$(document).ready(()=>{
  $('#all').on('click', () => {
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
    const id = $(this).attr('id');
    console.log(id)
    const url2 = `https://trektravel.herokuapp.com/trips/${id}`
    $.get(url2, response => {
      const thisTrip = response
      console.log(thisTrip);
      $('#trips').empty()
      const details = `<h2>${thisTrip.name}</h2> <ul><li>${thisTrip.continent}</li><li>${thisTrip.category}</li><li>${thisTrip.about}</li><li>$${thisTrip.cost}</li><li>${thisTrip.weeks}</li></ul>`
      $('#trips').append(details)
    })
  })
});
