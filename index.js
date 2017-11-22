const baseUrl = 'https://trektravel.herokuapp.com/trips'

const successCallback = function(response){
  console.log("POST request to reserve a spot on a trip was successful");
  console.log(response);
};
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
        $('#trip-form').attr('data-id' , `${response.id}`);
      });
      $('#show-trip').append(button);
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    });
  };

  // let reserveTrip = function reserveTrip(id){
  //
  // }

  // EVENTS
  $('#show-trips ul').on('click', 'h2', function(){
    let tripId = $(this).attr('data-id');
    loadTrip(tripId);
  });

  $('#load').on('click', function(){
    loadTrips();
  });

  $('#trip-form').on('submit', function(event){
    event.preventDefault();
    let url = baseUrl + `/${$(this).data('id')}/reservations`;
    // console.log(`URL: ${url}`);
    let formData = $('#trip-form').serialize();
    // console.log('formData');
    // console.log(formData);
    $.post(url, formData,successCallback).fail((response) => {
      // console.log("Didn't go so hot");
    });
  });
});
