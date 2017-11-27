/*eslint-disable*/
$(document).ready(()=>{
  $('#bookingForm').hide();
  const url = 'https://trektravel.herokuapp.com/trips'

  $.get(url, response=> {
    let countries = []
    const allTrips = response;
    for (let i = 0; i < allTrips.length; i++){
      const trip = allTrips[i]
      if (!(countries.includes(trip.continent)) && trip.continent !== null && trip.continent !== "") {
        console.log(trip.continent)
        countries.push(trip.continent)
        $('#countryMenu').append(`<li id='${trip.continent}'><a>${trip.continent}</a></li>`)
      }
    }
  })


  $('#countryMenu').append()
  $('#all').on('click', () => {
    $('#bookingForm').hide();

    $.get(url, response => {
      $('#trips').empty();
      const allTrips = response;
      for (let i = 0; i < allTrips.length; i++){
        const trip = allTrips[i]
        if (trip.name !== "" && trip.name !== null){
          $('#trips').append($(`<article><h3>${trip.name}</h3><p id="subDeets"> ${trip.continent} | ${trip.weeks} week(s)</p><img class="indexImg" src="http://images.all-free-download.com/images/graphiclarge/beautiful_natural_scenery_01_hd_picture_166232.jpg" alt="generic issue"></article>`).attr('id', `${trip.id}`).addClass('tripListAll column small-12 large-6 float-right'));
        console.log(trip);}
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
    const url2 = `https://trektravel.herokuapp.com/trips/${id}`
    $.get(url2, response => {
      const thisTrip = response
      // console.log(thisTrip);
      $('#trips').empty()

      const details = `<article id=${id} class="tripDetails"><h2>${thisTrip.name}</h2>
      <h5>${thisTrip.weeks} Weeks in ${thisTrip.continent} | ${thisTrip.category.toUpperCase()} | $${thisTrip.cost}</h5><img src='http://images.all-free-download.com/images/graphiclarge/beautiful_natural_scenery_01_hd_picture_166232.jpg', alt='a beautiful generic picture'/><p>${thisTrip.about}</p><button id="book" class="button small-12 large-12">Book This Trip</button></article>`

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
    // $('#trips').empty()
    $('#bookingForm').show();
    // console.log(tripNum);
    const url = `https://trektravel.herokuapp.com/trips/${tripNum}/reservations`
    $('#bookingForm form').attr('action', `${url}`)
  });

  $('form').submit(function(e) {
    e.preventDefault();

    const url = $(this).attr('action');
    const formData = $(this).serialize();

    console.log(formData);

    $.post(url, formData, (response)=>{
      $('#trips').html(`Booked your trip!`)

    }).fail(() => {
      $('#trips').html('<p>Booking Trip Failed</p>')
    }).always(()=> {

    })
  });

  $('#countryMenu').on('click', 'li', function(){
    $('#trips').empty();
    $.get(url, response=> {
      const allTrips = response;
      for (let i = 0; i < allTrips.length; i++){
        const trip = allTrips[i]
        if (trip.continent === this.id) {
          console.log(this.id)
          $('#trips').append($(`<article><h3>${trip.name}</h3><p id="subDeets"> ${trip.continent} | ${trip.weeks} week(s)</p><img class="indexImg" src="http://images.all-free-download.com/images/graphiclarge/beautiful_natural_scenery_01_hd_picture_166232.jpg" alt="generic issue"></article>`).attr('id', `${trip.id}`).addClass('tripListAll column small-12 large-6 float-right'));
        }
      }
    })
  });


});
