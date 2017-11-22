const baseUrl = 'https://trektravel.herokuapp.com/trips'

// {"id":1,"trip_id":1,"name":"Diane","email":null}
$(document).ready(()=> {
  $('#reserve-form').hide();


  let loadTrips = function loadTrips() {
    $.get(baseUrl, (response) => {
      console.log('success!');
      response.forEach(function(trip) {
        let tripInfo = `<li><h2 data-id=${trip.id}>` + trip.name + '<h2></li>';
        $('#show-trips ul').append(tripInfo)
      });
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>');
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  };

  let loadTrip = function loadTrip(id){
    $.get(baseUrl + `/${id}`, (response) => {
      console.log('success!');
      console.log(response);

      let tripInfo = `
      <p>ID: ${response.id}</p>
      <p>Category: ${response.category}</p>
      <p>Destination: ${response.continent}</p>
      <p>Details: ${response.about}</p>
      <p>Cost: $${response.cost}</p>
      <p>Length: ${response.weeks} weeks</p>`;
      $('#show-trip').html(tripInfo);

      let button = $(`<button id="reserve" value="${response.id}">Reserve A Spot!</button>
      `);

      button.click((event) => {
        console.log(`trip id:${response.id}`);
        console.log('reserve button was clicked');
        $('#reserve-form').show();
      });
      $('#show-trip').append(button);
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  };

  // let reserveTrip = function reserveTrip(id){
  //
  // }

  // EVENTS
  $('#show-trips ul').on('click', 'h2', function(){
    let tripId = $(this).attr('data-id');
    console.log('show trips event works test test test test');
    loadTrip(tripId);
  });

  $('#load').on('click', function(){
    console.log(this.value);
    loadTrips();
  });

  // $('#reserve').on('click', function(){
  //   console.log(this.value);
  //   console.log('reserve button was clicked');
  // });
});
