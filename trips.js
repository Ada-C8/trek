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
        $('#trips').append($(`<article><h3>${trip.name}</h3></article>`).attr('id', `${trip.id}`).addClass('tripListAll column small-12 large-4 float-right'));
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

  $('#trips').on('click', '.tripListAll', function(){
    $('#bookingForm').hide();
    const id = $(this).attr('id');
    console.log(id)
    const url2 = `https://trektravel.herokuapp.com/trips/${id}`
    $.get(url2, response => {
      const thisTrip = response
      // console.log(thisTrip);
      $('#trips').empty()

      const details = `<article id=${id} class="tripDetails"><h2>${thisTrip.name}</h2>
      <h5>${thisTrip.weeks} Weeks in ${thisTrip.continent} | ${thisTrip.category.toUpperCase()} | $${thisTrip.cost}</h5><p>${thisTrip.about}</p><button id="book" class="button small-12 large-12">Book This Trip</button></article>`

      $('#trips').append(details);
    })
    .fail(function() {
      $('#trips').text('Sorry! Invalid Request.')
    })
    .always(function() {
      console.log("this always happens!")
    })
  });

  $('#trips').on('click', '#book', function(){
    const tripNum = $(this).parent().attr('id');
    console.log('CLICK!')
    $('#trips').empty()
    $('#bookingForm').show();
    // console.log(tripNum);
    const url = `https://trektravel.herokuapp.com/trips/${tripNum}/reservations`
    $('#bookingForm form').attr('action', `${url}`)
  });

  $('form').submit(function(e) {
    e.preventDefault();

    const url = $(this).attr('action');
    console.log(this)
    console.log(url)
    const formData = $(this).serialize();

    console.log(formData);

    $.post(url, formData, (response)=>{
      $('#trips').html('Booked!')
      console.log(response)
    }).fail(() => {
      $('#trips').html('<p>Booking Trip Failed</p>')
    }).always(()=> {
      console.log("We're hiring!!")
    })
  });

});
