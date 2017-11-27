

$(document).ready(()=>{


  const successCallback = function(response) {
    console.log("POST request was successful");
    console.log(response);

    let generatedHTML = '<p>Everything went great: ';
    generatedHTML += `${response.name} is reserved for trip ID: ${ response.trip_id }.</p>`;

      $('#reservation-results').hide().show('slow').html(generatedHTML);
      setTimeout(function(){ $('#reservation-results').hide(); }, 10000);

  };


  let loadTrips = function loadTrips() {

  $.get('https://trektravel.herokuapp.com/trips',
    (response) => {
      console.log('success!');
      console.log(response);

      $('#trips ul').html('');  //idempotent
      $('#reservation-form').trigger('reset');
      response.forEach(function(trip) {
        let dataId = trip["id"];
        let tripData = `<li><h4> <a href="/" data-id=${trip["id"]}> ${trip["name"]} </a> </h4> </li>`;

        $('#trips ul').append(tripData);
      });

    })

    .fail(function(response){
       console.log(response);
       $('#fail').html('<p>Request was unsuccessful</p>')
    })

  };

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR A SPECIFIC TRIP
  let loadTrip = function loadTrip(id){
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        let tripInfo = `
        <h2> ${response.name} </h2>
        <p> ID: ${response.id} </p>
        <p> Continent: ${response.continent} </p>
        <p> Category: ${response.category} </p>
        <p> Weeks: ${response.weeks} </p>
        <p> Cost: ${response.cost} </p>
        <p> About: ${response.about} </p>`;

        $('.trip article').html(tripInfo);

        $('#reservation-form').off('submit')  //This turns off any previous handlers for submit

        $('#reservation-form').on('submit', function(event) {
          event.preventDefault();

          let formData = $('#reservation-form').serialize();
          console.log(formData);

          if (formData[name] === ""){
            console.log("Name required")
          }else{
          // console.log("Successfully reserved your spot!");

          $.post(`https://trektravel.herokuapp.com/trips/${response.id}/reservations`, formData, successCallback).fail((response) => {
            console.log("Sorry, your reservation did not go through, please try again.");
          });

          $('#reservation-form').hide();
          $('#reservation-form').trigger('reset');
          // $('#reservation-form').hide().show('slow');
          // setTimeout(function(){ $('#reservation-form').show(); }, 11000);
        }
        });

      })


  };


// EVENTS
  $('#reserve-spot').hide();
  $('#reservation-form').hide();
  $('#load-all-trips').on('click', loadTrips);

  $('#load-all-trips').on('click', function(event){
    $('#trips').show();
    $('.trip').hide();
  });


  $('#trips ul').on('click', 'a', function(event) {
    event.preventDefault();
    let tripID = $(this).attr('data-id');
    loadTrip(tripID);
    // $('#reservation-form').hide();
    $('#reservation-results').hide();
    $('.trip').show();
    $('#trips').hide();
    $('#reserve-spot').show();
  });

  $('#reserve-spot').on('click', function(event) {
    $('#reservation-form').show();
  });

});
