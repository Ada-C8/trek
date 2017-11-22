$(document).ready(()=>{
  $('.view-all-trips').on('click', function(){
    showAllTrips();
  });

  $('.reservation-form').hide();

});

let showAllTrips = function showAllTrips(){
  $.get('https://trektravel.herokuapp.com/trips',
  (response) => {
    $('.trips').empty();
    $('.trip-info').hide();
    $('.reservation-form').hide();

    response.forEach(function (trip){
      let tripName = trip.name;
      let tripId = trip.id;
      let continent = trip.continent;
      let weeks = trip.weeks;

      $('.trips').append(`<tr> <td class='trip-title'><a href=javascript:void(0) onclick=showSingleTrip(${tripId})> ${tripName}</a></td><td> ${continent} </td><td> ${weeks} </td> <tr>`);
    });
    $('.trips').show();
  })
  .fail(function(response){
    console.log(response);
  })
  .always(function(){
    console.log('always even if we have success or failure');
  });

};


let showSingleTrip = function showSingleTrip(id){

  $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) => {
    let tripName = response.name;
    let tripId = response.id;
    let continent = response.continent;
    let weeks = response.weeks;
    let about = response.about;
    let cost = response.cost;

    $('.trips').hide();
    $('.reservation-form').show();
    $('.trip-info').empty();

    $('.trip-info').append(`<h1> ${tripName} </h1><h3> ${continent} </h3><h3> ${weeks} </h3><h3> ${cost} </h3><p> ${about} </p>`);

    $('form').submit( function(e) {

      e.preventDefault();

      const url = `https://trektravel.herokuapp.com/trips/${tripId}/reservations`; // Retrieve the action from the form
      const formData = $(this).serialize();

      $.post(url, formData, (response) => {
        $('.reservation-form').hide();
        $('.message').append('<p> Reservation confirmed! </p>');
      }).fail(() => {
        $('.message').append('<p>Adding Reservation Failed</p>');
      });
    });
    $('.trip-info').show();

  })

  .fail(function(response){
    console.log(response);
  })
  .always(function(){
    console.log('always even if we have success or failure');
  });
};



let showTripByQuery = function showTripByQuery(){
  let param = 'continent'
  let query = document.getElementById('continent-filter');
  $.get(`https://trektravel.herokuapp.com/trips/${param}?query=${query}`,
  (response) => {
    $('.trips').empty();
    $('.trip-info').hide();
    $('.reservation-form').hide();

    response.forEach(function (trip){
      let tripName = trip.name;
      let tripId = trip.id;
      let continent = trip.continent;
      let weeks = trip.weeks;

      $('.trips').append(`<tr> <td class='trip-title'><a href=javascript:void(0) onclick=showSingleTrip(${tripId})> ${tripName}</a></td><td> ${continent} </td><td> ${weeks} </td> <tr>`);
    });
    $('.trips').show();
  })
  .fail(function(response){
    console.log(response);
  })
  .always(function(){
    console.log('always even if we have success or failure');
  });

};
