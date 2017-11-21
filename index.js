$(document).ready(()=>{

  $('.view-all-trips').on('click', function(){
    showAllTrips();
  });

});

const showAllTrips = function showAllTrips(){
  $.get('https://trektravel.herokuapp.com/trips',
  (response) => {

    response.forEach(function (trip){
      let tripName = response.name;
      let continent = response.continent;
      let weeks = response.weeks;

      $('.trips').append(`<tr> <td> ${tripName} </td><td> ${continent} </td><td> ${weeks} </td> <tr>`);


    });

  })
  .fail(function(response){
    console.log(response);
  })
  .always(function(){
    console.log('always even if we have success or failure');
  });
};

const showSingleTrip = function showSingleTrip(id){
  $.get(`https://trektravel.herokuapp.com/trips/${id}`,
  (response) => {

    let tripName = trip.name;
    let continent = trip.continent;
    let weeks = trip.weeks;
    let about = trip.about;
    let cost = trip.cost;

    $('.trips').hide();
    $('.show').append(`<h1> ${tripName} </h1><h3> ${continent} </h3><h3> ${weeks} </h3><h3> ${cost} </h3><p> ${about} </p>`);
    });

  .fail(function(response){
    console.log(response);
  })
  .always(function(){
    console.log('always even if we have success or failure');
  });
};
