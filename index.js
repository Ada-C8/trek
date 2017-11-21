$(document).ready(()=>{
  $('.view-all-trips').on('click', function(){
    showAllTrips();
  });
});

let showAllTrips = function showAllTrips(){
  $.get('https://trektravel.herokuapp.com/trips',
  (response) => {

    response.forEach(function (trip){
      let tripName = trip.name;
      let tripId = trip.id;
      let continent = trip.continent;
      let weeks = trip.weeks;

      $('.trips').append(`<tr> <td class='trip-title'><a href=javascript:void(0) onclick=showSingleTrip(${tripId})> ${tripName}</a></td><td> ${continent} </td><td> ${weeks} </td> <tr>`);
    });

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

    $('.show').append(`<h1> ${tripName} </h1><h3> ${continent} </h3><h3> ${weeks} </h3><h3> ${cost} </h3><p> ${about} </p>`);

    $('form').submit( function(e) {

      e.preventDefault();

      const url = `https://trektravel.herokuapp.com/trips/${tripId}/reservations`; // Retrieve the action from the form
      const formData = $(this).serialize();

      $.post(url, formData, (response) => {
        $('#message').html('<p> Reservation confirmed! </p>');
      }).fail(() => {
        $('#message').html('<p>Adding Reservation Failed</p>');
      });
    });

  })

  .fail(function(response){
    console.log(response);
  })
  .always(function(){
    console.log('always even if we have success or failure');
  });
};
