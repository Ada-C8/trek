$(document).ready(()=>{
  $('.view-all-trips').on('click', function(){
    showAllTrips();
  });

  $('.view-one-trip').on('click', function(){
    console.log('in the click');
    showSingleTrip('1');
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

      // $('.show').hide();

      $('.trips').append(`<tr> <td class='trip-title'><a href=javascript:void(0) onclick=showSingleTrip(${tripId})> ${tripName}</a></td><td> ${continent} </td><td> ${weeks} </td> <tr>`);

      $('.trip-title').innerHTML = (`<a href=javascript:void(0) onclick=showSingleTrip(${tripId}) />`);
      // $('trip-title').on('click', function(){
      //   showSingleTrip(tripId);
      // });

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
    let continent = response.continent;
    let weeks = response.weeks;
    let about = response.about;
    let cost = response.cost;

    // $('.trips').hide();


    $('.show').append(`<h1> ${tripName} </h1><h3> ${continent} </h3><h3> ${weeks} </h3><h3> ${cost} </h3><p> ${about} </p>`);


  })

  .fail(function(response){
    console.log(response);
  })
  .always(function(){
    console.log('always even if we have success or failure');
  });
};
